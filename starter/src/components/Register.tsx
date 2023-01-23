import { Link } from 'react-router-dom'

const Register: React.FC = () => {
    return (
        <section className="container-center">
            <h3 className="section-h3">Register</h3>
            <form className="form">
                <article className="form-center">
                    <div className="form-group">
                        <div className="validity-container">
                            <label htmlFor='username'>Username:</label>
                        </div>
                        <input type="text" id="username" name="username" />
                        <div className='constraint'></div>
                    </div>
                    <div className="form-group">
                        <div className="validity-container">
                            <label htmlFor='pswd'>Password:</label>
                        </div>
                        <input type="password" id="pswd" name="pswd" />
                        <div className='constraint'></div>
                    </div>
                    <div className="form-group">
                        <div className="validity-container">
                            <label htmlFor='confirm-pswd'>Confirm Password:</label>
                        </div>
                        <input type="password" id="confirm-pswd" name="confirm_pswd" />
                        <div className='constraint'></div>
                    </div>
                </article>
                <div className="btn-container">
                    <button type="submit" className='btn'>
                        Sign Up
                    </button>
                </div>
            </form>
            <article className="user-route">
                <p>Already have an account?</p>
                <Link to="/login">Sign in</Link>
            </article>
        </section>
    )
}

export default Register