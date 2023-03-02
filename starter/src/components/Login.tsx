import Button from './Button'
import userContext from '../hooks/Context'
import { useRef, useState, useEffect } from 'react'

const Login:React.FC = () => {
    document.title = "Login"

    const  {
        Link, LOGIN_URL,
        showPswd, setShowPswd,
    } = userContext()

    const errRef = useRef<any>()
    const userRef = useRef<HTMLInputElement>(null)

    const [user, setUser] = useState<string>("")
    const [pswd, setPswd] = useState<string>("")
    const [errMsg, setErrMsg] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false)

    const isValid = Boolean(user) && Boolean(pswd)

    useEffect(() => {
        userRef.current?.focus()
    }, [])

    useEffect(() => {
        setErrMsg("")
    }, [user, pswd])
    
    return (
        <section className="container-center">
            <div className={`err-container ${errMsg ? 'errMsg' : 'hidden'}`}>
                    <p ref={errRef} aria-live="assertive">
                        {errMsg}
                    </p>
            </div>
            <h3 className="section-h3">Login</h3>
            <form className="form">
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