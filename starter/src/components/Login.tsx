const Login:React.FC = () => {
    return (
        <section className="container-center">
            <h3 className="section-h3">Login</h3>
            <form>
                <div className="form-group">
                    <label htmlFor='username'>Username:</label>
                    <input type="text" id="username" />
                </div>
                <div className="form-group">
                    <label htmlFor='pswd'>Password:</label>
                    <input type="password" id="pswd" />
                </div>
                <button type="button" className='btn'>
                    Login
                </button>
            </form>
        </section>
    )
}

export default Login