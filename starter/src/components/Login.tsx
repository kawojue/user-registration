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
    const userRef = useRef<HTMLInputElement>()

    const [user, setUser] = useState<string>("")
    const [pswd, setPswd] = useState<string>("")
    const [errMsg, setErrMsg] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false)

    useEffect(() => {
        userRef.current?.focus()
    }, [])
    
    return (
        <section className="container-center">
            <h3 className="section-h3">Login</h3>
            <form className="form">
                <article className="form-center">
                    <div className="form-group">
                        <div className="validity-container">
                            <label htmlFor='username'>Username:</label>
                        </div>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor='pswd'>Password:</label>
                        <article className="pswd-container">
                            <input type={showPswd ? 'text': 'password'}
                            id="pswd" name="password" />
                            <Button get={showPswd} set={setShowPswd} />
                        </article>
                    </div>
                </article>
                <div className="btn-container">
                    <button type="submit" className='btn'>
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