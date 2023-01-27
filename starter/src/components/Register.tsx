import userContext from "../hooks/Context"
import registerContext from "../hooks/RegisterContext"

const Register: React.FC = () => {
    document.title = "Sign Up"

    const {
        AiFillEyeInvisible, AiFillEye,
        FaInfoCircle, FaTimes, FaCheck,
        Link
    } = userContext()

    const {
        errMsg, errRef, user, pswd,
        confirmPswd, userRef, setUserFocus,
        validName, userFocus, validPswd, pswdFocus,
        setPswdFocus, setUser, setPswd, setConfirmPswd,
        setConfirmFocus, validConfirm, showPswd, setShowPswd,
        confirmFocus, showConfirmPswd, setShowConfirmPswd,
        handleSubmit, isValid, success
    } = registerContext()

    return (
        <section className="container-center">
            {success ? 
            <article className="user-route">
                <p className="success">Success!</p>
                <Link to="/login">Sign in</Link>
            </article> :
            <>
                <div className={`err-container ${errMsg ? 'errMsg' : 'hidden'}`}>
                    <p ref={errRef} aria-live="assertive">
                        {errMsg}
                    </p>
                </div>
                <h3 className="section-h3">Sign Up</h3>
                <form className="form" action="" method="POST"
                onSubmit={e => handleSubmit(e)}>
                    <article className="form-center">
                        <div className="form-group">
                            <article className="validity-container">
                                <label htmlFor='username'>
                                    username:
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
                                    Only hyphens, underscores are allowed.
                                </p>
                            </article>
                        </div>
                        <div className="form-group">
                            <article className="validity-container">
                                <label htmlFor='pswd'>
                                    password:
                                </label>
                                <div>
                                    <FaCheck className={validPswd ? 'valid': 'hidden'} />
                                    <FaTimes className={validPswd || !pswd ? 'hidden': 'invalid'} />
                                </div>
                            </article>
                            <article className="pswd-container">
                                <input type={showPswd ? 'text': 'password'} id="pswd" name="pswd"
                                value={pswd} onChange={e => setPswd(e.target.value)}
                                onFocus={() => setPswdFocus(true)}
                                onBlur={() => setPswdFocus(false)}
                                aria-invalid={validPswd ? "false": "true"} />
                                <button className="eye" onClick={() => setShowPswd(!showPswd)}
                                type="button">
                                    {showPswd ? <AiFillEye/> : <AiFillEyeInvisible/>}
                                </button>
                            </article>
                            <article
                            className={pswdFocus && pswd && !validPswd ? 'constraint' : 'hidden'}>
                                <FaInfoCircle />
                                <p>
                                    Password must contain: <br />
                                    A Special Character (!@#$&*) <br />
                                    A number (0-9) <br />
                                    Letters in Lowercase and Uppercase<br />
                                </p>
                            </article>
                        </div>
                        <div className="form-group">
                            <article className="validity-container">
                                <label htmlFor='confirm-pswd'>
                                    confirm password:
                                </label>
                                <div>
                                    <FaCheck className={validConfirm ? 'valid': 'hidden'} />
                                    <FaTimes
                                    className={validConfirm || !confirmPswd ? 'hidden': 'invalid'} />
                                </div>
                            </article>
                            <article className="pswd-container">
                                <input id="confirm-pswd" name="confirm_pswd"
                                type={showConfirmPswd ? 'text': 'password'}
                                value={confirmPswd} onChange={e => setConfirmPswd(e.target.value)}
                                onFocus={() => setConfirmFocus(true)}
                                onBlur={() => setConfirmFocus(false)}
                                aria-invalid={validConfirm ? "false": "true"} />
                                <button className="eye" type="button"
                                onClick={() => setShowConfirmPswd(!showConfirmPswd)}>
                                    {showConfirmPswd ? <AiFillEye/> : <AiFillEyeInvisible/>}
                                </button>
                            </article>
                            <article className={confirmFocus && confirmPswd &&
                            !validConfirm ? 'constraint' : 'hidden'}>
                                <FaInfoCircle />
                                <p>
                                    Password does not match.
                                </p>
                            </article>
                        </div>
                    </article>
                    <div className="btn-container">
                        <button type="submit" className='btn' disabled={!isValid}>
                            Sign Up
                        </button>
                    </div>
                </form>
                <article className="user-route">
                    <p>Already have an account?</p>
                    <Link to="/login">Sign in</Link>
                </article>
            </>
            }
        </section>
    )
}

export default Register