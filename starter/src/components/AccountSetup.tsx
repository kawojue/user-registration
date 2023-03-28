import axios from '../api/create'
import userContext from '../hooks/useContext'
import { FormEvent, useEffect, useState } from 'react'
import { FaInfoCircle, FaTimes, FaCheck } from 'react-icons/fa'

const AccountSetup: React.FC = () => {
    const {
        Link, errMsg, errRef,
        user, setUserFocus, validName,
        userFocus, setUser, userRef,
        vCode, setVCode, verifyEmail,
        setErrMsg
    }: any = userContext()

    const [success, setSuccess] = useState<boolean>(false)

    useEffect(() => {
        userRef.current?.focus()
    })

    useEffect(() => {
        setErrMsg("")
    }, [vCode, user])

    const isValid: boolean = Boolean(validName) && Boolean(vCode)

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault()
        await axios.post(
            '/account/setup',
            JSON.stringify({ verifyEmail, vCode }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            },
        )
    }

    return (
        <>
            {success ? 
            <article className="user-route">
                <p className="success">Account created successfully!</p>
                <Link to="/auth/login">Sign in</Link>
            </article> :
            <>
                <div className={`err-container ${errMsg ? 'errMsg' : 'hidden'}`}>
                    <p ref={errRef} aria-live="assertive">
                        {errMsg}
                    </p>
                </div>
                <h3 className="section-h3">Account Setup</h3>
                <form className="form" method="POST"
                onSubmit={handleSubmit}>
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
                                value={user} onChange={e => setUser(e.target.value)}
                                onBlur={() => setUserFocus(false)} onFocus={() => setUserFocus(true)}
                                aria-invalid={validName ? "false" : "true"} aria-describedby="uidnote" max={23}/>
                            <article
                            className={userFocus && user && !validName ? 'constraint': 'hidden'}>
                                <FaInfoCircle />
                                <p id="uidnote">
                                    3 to 23 characters. <br />
                                    Must begin with a letter. <br />
                                    Only hyphens, underscores are allowed.
                                </p>
                            </article>
                        </div>
                        {/* Email verification field */}
                        <div className="form-group">
                            <article className="validity-container">
                                <label htmlFor='vcode'>
                                    Code:
                                </label>
                            </article>
                            <input type="text" id="vcode" autoComplete="off"
                            placeholder='OTP sent to your mail.'
                            value={vCode} max={6}
                            onChange={e => setVCode(e.target.value)} />
                        </div>
                    </article>
                    <div className="btn-container">
                        <button type="submit" className='btn' disabled={!isValid}>
                            Finish
                        </button>
                    </div>
                </form>
                <article className="user-route">
                    <p>Already have an account?</p>
                    <Link to="/auth/login">Sign in</Link>
                </article>
            </>
            }
        </>
    )
}

export default AccountSetup