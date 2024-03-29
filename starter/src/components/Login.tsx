import Button from './Button'
import axios from '../api/create'
import { detect } from 'detect-browser'
import AccountSetup from './AccountSetup'
import userContext from '../hooks/useContext'
import { useRef, useState, useEffect, FormEvent } from 'react'
import { useLocation, useNavigate, NavigateFunction, Location } from 'react-router-dom'

const Login:React.FC = () => {
    document.title = "Login"

    const  {
        Link, showPswd, setShowPswd,
        setAuth, ToastContainer,
        showToastMessage, 
    } = userContext()

    const deviceInfo = detect()
    const location: Location = useLocation()
    const navigate: NavigateFunction = useNavigate()
    const from: string = location.state?.from?.pathname || '/'

    const userRef = useRef<HTMLInputElement>(null)
    const [user, setUser] = useState<string>("")
    const [pswd, setPswd] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false)
    const [verified, setVerified] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [verifyEmail, setVerifyEmail] = useState<string>("")

    const isValid = Boolean(user) && Boolean(pswd)

    useEffect(() => {
        userRef.current?.focus()
    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()
        setIsLoading(true)
        if (!isValid) {
            showToastMessage("error", "Invalid Entry!")
        }

        await axios.post("/auth/login",
        JSON.stringify({ user, pswd, deviceInfo }),
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res: any) => {
            const { success, mail }: any = res?.data
            setPswd("")
            setSuccess(success)
            setVerifyEmail(mail.email)
            setVerified(mail.isVerified)
            if (mail.isVerified) {
                setAuth(res?.data)
                localStorage.setItem("user", JSON.stringify(res?.data))
                navigate(from, { replace: true })
                return
            }
            setIsLoading(false)
        }).catch((err: any) => {
            const errMsg: string = err.response?.data?.message
            if (err.code === 'ERR_NETWORK') {
                showToastMessage("error", "Something went wrong")
            } else {
                showToastMessage("error", errMsg)
            }
            setIsLoading(false)
        })
    }

    if (!verified && success) {
        return (
            <section className="container">
                <AccountSetup get={verifyEmail} set={setVerifyEmail} />
            </section>
        )
    }
    
    return (
        <section className="container">
            <ToastContainer />
            <h3 className="section-h3">Login</h3>
            <form className="form" method='POST'
            onSubmit={e => handleSubmit(e)}>
                <article className="form-center">
                    <div className="form-group">
                        <label htmlFor='username'>email or username:</label>
                        <input type="text" id="username" name="username" ref={userRef}
                        value={user} onChange={e => setUser(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor='pswd'>Password:</label>
                        <article className="pswd-container">
                            <input type={showPswd ? 'text': 'password'}
                            id="pswd" name="password" value={pswd}
                            onChange={e => setPswd(e.target.value)} />
                            <Button get={showPswd} set={setShowPswd} />
                        </article>
                    </div>
                </article>
                <article className="fgtpswd">
                    <Link to="/account/password/reset">Forgot password?</Link>
                </article>
                <div className="btn-container">
                    <button type="submit" className='btn' disabled={!isValid}>
                        {isLoading ? "Authenticating.." : "Login"}
                    </button>
                </div>
            </form>
            <article className="user-route">
                <p>Don't have an account?</p>
                <Link to="/auth/signup">Sign up</Link>
            </article>
        </section>
    )
}

export default Login