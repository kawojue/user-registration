import Button from './Button'
import axios from '../api/create'
import { detect } from 'detect-browser'
import userContext from '../hooks/Context'
import { useRef, useState, useEffect, FormEvent } from 'react'

const Login:React.FC = () => {
    document.title = "Login"

    const  {
        Link, LOGIN_URL, errRef,
        showPswd, setShowPswd, auth,
        errMsg, setErrMsg, setAuth
    } = userContext()

    const loginInfo = detect()
    const userRef = useRef<HTMLInputElement>(null)
    const [user, setUser] = useState<string>("")
    const [pswd, setPswd] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false)

    const isValid = Boolean(user) && Boolean(pswd)

    useEffect(() => {
        userRef.current?.focus()
    }, [])

    useEffect(() => {
        setErrMsg("")
    }, [user, pswd])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()
        if (!isValid) {
            setErrMsg("Invalid Entry!")
        }

        await axios.post(`${LOGIN_URL}`,
        JSON.stringify({ user, pswd, loginInfo }),
        {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then(res => {
            const data: any = res?.data
            const email: string = data.email
            const roles: number[] = data.roles
            const accessToken: string = data.accessToken
            const username: string = data.username.toLowerCase()
            setAuth({ email, username, roles, accessToken })
            setSuccess(data.success)
        }).catch(err => {
            if (err.code === 'ERR_NETWORK') {
                setErrMsg(err.message)
                setSuccess(false)
            } else {
                setErrMsg(err.response?.data.message)
                setSuccess(err.response?.data.success)
            }
            setTimeout(() => {
                setErrMsg("")
            }, 3500);
        })
    }
    
    return (
        <section className="container">
            { success ?
                <article className="user-route">
                    <p className="success">You're logged in!</p>
                    <Link to={`/@${auth.username}`}>Go home.</Link>
                </article> :
            <>
                <div className={`err-container ${errMsg ? 'errMsg offscreen' : 'hidden'}`}>
                        <p ref={errRef} aria-live="assertive">
                            {errMsg}
                        </p>
                </div>
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
                        <Link to="/auth/forgotten">Forgot password?</Link>
                    </article>
                    <div className="btn-container">
                        <button type="submit" className='btn' disabled={!isValid}>
                            Login
                        </button>
                    </div>
                </form>
                <article className="user-route">
                    <p>Don't have an account?</p>
                    <Link to="/auth/signup">Sign up</Link>
                </article>
            </> }
        </section>
    )
}

export default Login