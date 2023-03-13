import Button from "./Button"
import axios from '../api/create'
import { detect } from "detect-browser"
import { FormEvent, useState } from 'react'
import userContext from "../hooks/Context"
import { FaInfoCircle, FaTimes, FaCheck } from 'react-icons/fa'

interface IResetPswd {
    userId: string,
    verified: boolean
}

const ResetPswd: React.FC<IResetPswd> = ({ userId, verified }) => {
    const deviceInfo = detect()
    const [success, setSuccess] = useState<boolean>(false)

    const {
        confirmFocus, setErrMsg,
        Link, errMsg, errRef,
        pswd, confirmPswd, validPswd,
        setConfirmPswd, setConfirmFocus,
        pswdFocus, setPswdFocus, setPswd,
        validConfirm, showPswd, setShowPswd
    } = userContext()

    const isValid = Boolean(validPswd) && Boolean(validConfirm)

    const handleSubmit = async (e: FormEvent):Promise<void> => {
        e.preventDefault()
        await axios.post(
            '/account/passwordreset',
            JSON.stringify({ userId, verified, pswd, deviceInfo }),
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        ).then(res => {
            setPswd("")
            setConfirmPswd("")
            setSuccess(res?.data.success)
        }).catch(err => {
            setErrMsg(err.response?.data.message)
        })
    }

    return (
        <>
            {success ? 
            <article className="user-route">
                <p className="success">You successfully changed your password.</p>
                <Link to="/auth/login">Sign in</Link>
            </article> :
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
                                <Button get={showPswd} set={setShowPswd}/>
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
                            Save
                        </button>
                    </div>
                </form>
            </>
            }
        </>
    )
}

export default ResetPswd