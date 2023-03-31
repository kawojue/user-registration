import Button from "./Button"
import axios from '../api/create'
import { FormEvent } from 'react'
import { detect } from "detect-browser"
import userContext from "../hooks/useContext"
import { useNavigate, Location, useLocation, NavigateFunction } from 'react-router-dom'
import { FaInfoCircle, FaTimes, FaCheck } from 'react-icons/fa'

interface IResetPswd {
    userId: string,
    verified: boolean
}

const ResetPswd: React.FC<IResetPswd> = ({ userId, verified }) => {
    const deviceInfo = detect()

    const {
        confirmFocus, ToastContainer,
        pswd, confirmPswd, validPswd,
        setConfirmPswd, setConfirmFocus,
        pswdFocus, setPswdFocus, setPswd,
        validConfirm, showPswd, setShowPswd,
        showToastMessage
    } = userContext()

    const locaion: Location = useLocation()
    const navigate: NavigateFunction = useNavigate()
    const from: string = locaion.state?.from?.pathname || "/"

    const isValid = Boolean(validPswd) && Boolean(validConfirm)

    const handleSubmit = async (e: FormEvent):Promise<void> => {
        e.preventDefault()

        if (!isValid) {
            showToastMessage("warning", "Password does not match.")
            return
        }

        await axios.post(
            '/account/password/forgotten',
            JSON.stringify({ userId, verified, pswd, deviceInfo }),
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        ).then((res: any) => {
            setPswd("")
            setConfirmPswd("")
            showToastMessage("success", "Password reset successfully.")
            setTimeout(() => {
                navigate(from, { replace: true })
            }, 2000)
        }).catch(err => {
            showToastMessage("error", err.response?.data?.message)
        })
    }

    return (
        <>
            <ToastContainer />
            <h3 className="section-h3">New Password</h3>
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
    )
}

export default ResetPswd