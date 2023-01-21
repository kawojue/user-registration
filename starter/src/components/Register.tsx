const Register:React.FC = () => {
    return (
        <section className="container-center">
            <h3 className="section-h3">Register</h3>
            <form>
                <div className="form-group">
                    <label htmlFor='username'>Username:</label>
                    <input type="text" id="username" />
                </div>
                <div className="form-group">
                    <label htmlFor='pswd'>Password:</label>
                    <input type="password" id="pswd" />
                </div>
                <div className="form-group">
                    <label htmlFor='confirm-pswd'>Password:</label>
                    <input type="password" id="confirm-pswd" />
                </div>
                <button type="button" className='btn'>
                    Sign Up
                </button>
            </form>
        </section>
    )
}

export default Register