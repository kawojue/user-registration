import { Link } from "react-router-dom"

const Login:React.FC = () => {
    return (
        <section className="container-center">
            <h3 className="section-h3">Login</h3>
            <form className="form">
                <article className="form-center">
                    <div className="form-group">
                        <div className="validity-container">
                            <label htmlFor='username'>Username:</label>
                        </div>
                        <input type="text" id="username" />
                    </div>
                    <div className="form-group">
                        <div className="validity-container">
                            <label htmlFor='pswd'>Password:</label>
                        </div>
                        <input type="password" id="pswd" />
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
                <Link to="/">Sign up</Link>
            </article>
        </section>
    )
}

export default Login