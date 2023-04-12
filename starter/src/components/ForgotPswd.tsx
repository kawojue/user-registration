import axios from '../api/create'
import ResetPswd from './ResetPswd'
import userContext from '../hooks/useContext'
import { useRef, useState, useEffect } from 'react'
import { FaInfoCircle, FaTimes, FaCheck } from 'react-icons/fa'

const ForgotPswd: React.FC = () => {
    const {
        ToastContainer,
        showToastMessage,
        userId, setUserId,
        EMAIL_REGEX, requestOtp,
    } = userContext()
    
    const emailRef = useRef<HTMLInputElement>(null)

    const [otp, setOtp] = useState<string>("")
    const [verified, setVerified] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [email, setEmail] = useState<string>("")
    const [validEmail, setValidEmail] = useState<string>("")
    const [emailFocus, setEmailFocus] = useState<boolean>(false)

    const isValid: boolean = Boolean(validEmail) && Boolean(otp)

    useEffect(() => {
        emailRef.current?.focus()
    }, [])

    useEffect(() => {
        const res = EMAIL_REGEX.test(email)
        setValidEmail(res)
    }, [email, otp])

    const verifyOTP = async ():Promise<void> => {
        setIsLoading(true)
        await axios.post(
            '/account/password/verify',
            JSON.stringify({ userId, otp }),
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        ).then(res => {
            const data = res?.data
            setUserId(data.userId)
            setVerified(data.verified)
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            showToastMessage("error", err.response?.data?.message)
        })
    }

    return (
    <section className="container">
        <ToastContainer />
        { verified ?
            <ResetPswd verified={verified} userId={userId} /> :
            <>
                <h3 className="section-h3">Reset Password</h3>
                <form className="form" method="POST"
                onSubmit={e => e.preventDefault()}>
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
                                    aria-invalid={validEmail ? "false" : "true"} aria-describedby="uidnote" />
                                <article
                                className={emailFocus && email && !validEmail ? 'constraint': 'hidden'}>
                                    <FaInfoCircle />
                                    <p id="uidnote">
                                        Invalid email.
                                    </p>
                                </article>
                        </div>
                        <div className="form-group">
                            <label htmlFor='otp'>Code: </label>
                            <input type='text' value={otp} id="otp"
                            onChange={e => setOtp(e.target.value)}
                            placeholder="OTP sent to your mail"/>
                        <div className="reqOtp-container">
                            <button className="reqOtp-btn"
                            disabled={!Boolean(validEmail)}
                            onClick={
                                async () => await requestOtp(email, '/account/password/reset')
                            }>
                                Request OTP
                            </button>
                        </div>
                        </div>
                    </article>
                    <div className="btn-container">
                        <button type="submit" className='btn'
                        disabled={!isValid}
                        onClick={async () => await verifyOTP()}>
                            {isLoading ? "Validating..": "Validate"}
                        </button>
                    </div>
                </form>
            </>}
        </section>
    )
}

export default ForgotPswd
