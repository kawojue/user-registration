const Register:React.FC = () => {
    return (
        <section className="container-center">
            <h3 className="section-h3">Register</h3>
            <form className="form">
                <article className="form-center">
                    <div className="form-group">
                        <label htmlFor='username'>Username:</label>
                        <input type="text" id="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor='pswd'>Password:</label>
                        <input type="password" id="pswd" />
                    </div>
                    <div className="form-group">
                        <label htmlFor='confirm-pswd'>Confirm Password:</label>
                        <input type="password" id="confirm-pswd" />
                    </div>
                </article>
                <div className="btn-container">
                    <button type="submit" className='btn'>
                        Sign Up
                    </button>
                </div>
            </form>
        </section>
    )
}

export default Register