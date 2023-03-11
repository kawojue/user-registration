import axios from '../api/create'
import ChangePswd from './ChangePswd'
import userContext from '../hooks/Context'
import { useRef, useState, useEffect, FormEvent } from 'react'
import { FaInfoCircle, FaTimes, FaCheck } from 'react-icons/fa'

const ForgotPswd: React.FC = () => {
    const { EMAIL_REGEX } = userContext()

    const errRef = useRef<any>()
    const emailRef = useRef<HTMLInputElement>(null)

    const [otp, setOtp] = useState<string>("")
    const [totp, setTotp] = useState<string>("")
    const [otpDate, setOtpDate] = useState<number>(0)
    const [userId, setUserId] = useState<string>("")
    const [verified, setVerified] = useState<boolean>(false)

    const [email, setEmail] = useState<string>("")
    const [validEmail, setValidEmail] = useState<string>("")
    const [emailFocus, setEmailFocus] = useState<boolean>(false)

    const [pswd, setPswd] = useState<string>("")

    const [success, setSuccess] = useState<boolean>(false)
    const [errMsg, setErrMsg] = useState<string | null>(null)

    const isValid: boolean = Boolean(validEmail)

    useEffect(() => {
        emailRef.current?.focus()
    }, [])

    useEffect(() => {
        const res = EMAIL_REGEX.test(email)
        setValidEmail(res)
        setErrMsg("")
    }, [email, otp])

    const handleSubmit = async (e: FormEvent):Promise<void> => {
        e.preventDefault()
        if (!isValid) {
            setErrMsg('Warning!')
        }
        axios.post(
            '/auth/forgotten',
            JSON.stringify({ email }),
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        ).then(res => {
            const { totp, success, date }: any = res?.data
            setTotp(totp)
            setOtpDate(date)
            setUserId(email)
            setSuccess(success)
        }).catch(err => {
            setErrMsg(err.response?.data.message)
            setSuccess(err.response?.data.success)
            setTimeout(() => {
                setErrMsg("")
            }, 3500);
        })
    }

    const verifyOTP = async (e: FormEvent):Promise<void> => {
        e.preventDefault()
        await axios.post(
            '/account/reset',
            JSON.stringify({ userId, otp, totp, date: otpDate }),
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        ).then(res => {
            const data = res?.data
            setUserId(data.userId)
            setVerified(data.verified)
        }).catch(err => {
            setErrMsg(err.response?.data.message)
        })
    }

    return (
    <section className="container">
        <div className={`err-container ${errMsg ? 'errMsg' : 'hidden'}`}>
            <p ref={errRef} aria-live="assertive">
                {errMsg}
            </p>
        </div>
        { verified ?
        <ChangePswd verified={verified} password={pswd} userId={userId} />:
            <>
            {success ?
            <article className="user-route">
                <p className="mb-2 text-lg text-pry-clr-0">Code sent to your mail: </p>
                <form onSubmit={e => verifyOTP(e)}>
                    <input type='text' value={otp}
                    onChange={e => setOtp(e.target.value)} />
                    <div className="btn-container">
                        <button type="submit" className='btn'>
                            Verify
                        </button>
                    </div>
                </form>
            </article> :
            <>
                <h3 className="section-h3">Forgot Password</h3>
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
                                    aria-invalid={validEmail ? "false" : "true"} aria-describedby="uidnote" />
                                <article
                                className={emailFocus && email && !validEmail ? 'constraint': 'hidden'}>
                                    <FaInfoCircle />
                                    <p id="uidnote">
                                        Invalid email.
                                    </p>
                                </article>
                        </div>
                    </article>
                    <div className="btn-container">
                        <button type="submit" className='btn' disabled={!isValid}>
                            Send OTP
                        </button>
                    </div>
                </form>
            </> }</>}
        </section>
    )
}

export default ForgotPswd