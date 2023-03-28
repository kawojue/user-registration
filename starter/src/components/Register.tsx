import Button from "./Button"
import { useEffect } from 'react'
import AccountSetup from "./AccountSetup"
import userContext from "../hooks/useContext"
import { FaInfoCircle, FaTimes, FaCheck } from 'react-icons/fa'

const Register: React.FC = () => {
    document.title = "Sign Up"

    const {
        Link, errMsg, errRef, pswd,
        confirmPswd, emailRef, validPswd,
        pswdFocus, setPswdFocus, setPswd,
        setConfirmPswd, setConfirmFocus,
        validConfirm, showPswd, setShowPswd,
        confirmFocus, handleSubmit, isValid,
        success, email, setEmail, validEmail,
        emailFocus, setEmailFocus
    }: any = userContext()

    useEffect(() => {
        emailRef.current?.focus()
    }, [])

    return (
        <section className="container">
            {success ? 
            <AccountSetup /> :
            <>
                <div className={`err-container ${errMsg ? 'errMsg' : 'hidden'}`}>
                    <p ref={errRef} aria-live="assertive">
                        {errMsg}
                    </p>
                </div>
                <h3 className="section-h3">Signup</h3>
                <form className="form" method="POST"
                onSubmit={e => handleSubmit(e)}>
                    <article className="form-center">
                        <div className="form-group">
                            <article className="validity-container">
                                <label htmlFor='email'>
                                    email:
                                </label>
                                <div>
                                    <FaCheck className={validEmail ? 'valid': 'hidden'} />
                                    <FaTimes className={validEmail || !email ? 'hidden': 'invalid'} />
                                </div>
                            </article>
                            <input type="text" id="email" name="email" autoComplete="off"
                                    value={email} ref={emailRef}
                                    onChange={e => setEmail(e.target.value)}
                                    onBlur={() => setEmailFocus(false)}
                                    onFocus={() => setEmailFocus(true)}
                                    aria-invalid={validEmail ? "false" : "true"} aria-describedby="uidnote" max={23} />
                                <article
                                className={emailFocus && email && !validEmail ? 'constraint': 'hidden'}>
                                    <FaInfoCircle />
                                    <p id="uidnote">
                                        Invalid email.
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
                                aria-invalid={validPswd ? "false": "true"} max={89} />
                                <Button get={showPswd} set={setShowPswd} />
                            </article>
                            <article
                            className={pswdFocus && pswd && !validPswd ? 'constraint' : 'hidden'}>
                                <FaInfoCircle />
                                <p>
                                    Password must contain: <br />
                                    At least a Special Character (!@#$&*) <br />
                                    At least a number (0-9) <br />
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
                            <input id="confirm-pswd" name="confirm_pswd"
                            type={showPswd ? 'text': 'password'}
                            value={confirmPswd} onChange={e => setConfirmPswd(e.target.value)}
                            onFocus={() => setConfirmFocus(true)}
                            onBlur={() => setConfirmFocus(false)}
                            aria-invalid={validConfirm ? "false": "true"} />
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
                    <Link to="/auth/login">Sign in</Link>
                </article>
            </>
            }
        </section>
    )
}

export default Register