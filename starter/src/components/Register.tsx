import userContext from "../Context"

const Register: React.FC = () => {
    document.title = "Register"

    const {
        Link, errMsg, errRef,
        user, pswd, confirmPswd, userRef,
        setUser, setPswd, setConfirmPswd,
        setUserFocus, validName, userFocus,
        FaInfoCircle, FaTimes, FaCheck, validPswd,
        pswdFocus, setPswdFocus
    } = userContext()

    return (
        <section className="container-center">
            <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live="assertive">
                {errMsg}
            </p>
            <h3 className="section-h3">Register</h3>
            <form className="form" action="" method="POST">
                <article className="form-center">
                    <div className="form-group">
                        <article className="validity-container">
                            <label htmlFor='username'>
                                Username:
                            </label>
                            <div>
                                <FaCheck className={validName ? 'valid': 'hidden'} />
                                <FaTimes className={validName || !user ? 'hidden': 'invalid'} />
                            </div>
                        </article>
                        <input type="text" id="username" name="username" autoComplete="off"
                            ref={userRef} value={user} onChange={e => setUser(e.target.value)}
                            onBlur={() => setUserFocus(false)} onFocus={() => setUserFocus(true)}
                            aria-invalid={validName ? "false" : "true"} aria-describedby="uidnote" />
                        <article
                        className={userFocus && user && !validName ? 'constraint': 'hidden'}>
                            <FaInfoCircle />
                            <p id="uidnote">
                                4 to 23 characters. <br />
                                Must begin with a letter. <br />
                                Symbols are allowed.
                            </p>
                        </article>
                    </div>
                    <div className="form-group">
                        <div className="validity-container">
                            <label htmlFor='pswd'>Password:</label>
                        </div>
                        <input type="password" id="pswd" name="pswd"
                        value={pswd} onChange={e => setPswd(e.target.value)}
                        onFocus={() => setPswdFocus(true)}
                        onBlur={() => setPswdFocus(false)}
                        aria-invalid={validPswd ? "false": "true"} />
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