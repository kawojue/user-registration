import Button from './Button'
import axios from '../api/create'
import userContext from '../hooks/Context'
import { useRef, useState, useEffect, FormEvent } from 'react'

const Login:React.FC = () => {
    document.title = "Login"

    const  {
        Link, LOGIN_URL, errRef,
        showPswd, setShowPswd,
        errMsg, setErrMsg, success,
        setSuccess, userRef
    } = userContext()

    const [user, setUser] = useState<string>("")
    const [pswd, setPswd] = useState<string>("")

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
        JSON.stringify({ user, pswd }),
        {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then(_ => {
            console.log(_)
            setSuccess(true)
        }).catch(err => {
            const statusCode = err.response?.status
            if (statusCode === 400) {
                setErrMsg("Invalid Credentials.")
            } else if (statusCode ===  409) {
                setErrMsg("User does not exist.")
            } else if (statusCode === 401) {
                setErrMsg("Password is Incorrect.")
            } else {
                setErrMsg("Internal server error.")
            }
        })
    }
    
    return (
        <section className="container-center">
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
                        <label htmlFor='username'>Username:</label>
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
        </section>
    )
}

export default Login