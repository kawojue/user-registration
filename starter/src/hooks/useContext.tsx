import axios from '../api/create'
import { detect } from 'detect-browser'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import React, { createContext, useContext, useRef, useState, useEffect, FormEvent } from 'react'

const Context: any | null = createContext({})

export const UserProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const LOGIN_URL:string = "/auth/login"
    const REGISTER_URL:string = "/auth/signup"
    const EMAIL_REGEX:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const USER_REGEX:RegExp = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/
    const PSWD_REGEX:RegExp = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{4,89}$/
    
    const deviceInfo = detect()
    const userRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const [userId, setUserId] = useState<string>("")
    const [auth, setAuth] = useState<any>(JSON.parse(localStorage.getItem("user") as any) || {})

    const [userFocus, setUserFocus] = useState<boolean>(false)

    const [vCode, setVCode] = useState<string>('')
    const [verifyEmail, setVerifyEmail] = useState<string>('')
    const [vCodeFocus, setVCodeFocus] = useState<boolean>(false)

    const [email, setEmail] = useState<string>('')
    const [validEmail, setValidEmail] = useState<boolean>(false)
    const [emailFocus, setEmailFocus] = useState<boolean>(false)

    const [pswd, setPswd] = useState<string>('')
    const [validPswd, setValidPswd] = useState<boolean>(false)
    const [pswdFocus, setPswdFocus] = useState<boolean>(false)

    const [confirmPswd, setConfirmPswd] = useState<string>('')
    const [validConfirm, setValidConfirm] = useState<boolean>(false)
    const [confirmFocus, setConfirmFocus] = useState<boolean>(false)

    const [success, setSuccess] = useState<boolean>(false)
    const [showPswd, setShowPswd] = useState<boolean>(false)
    const [showConfirmPswd, setShowConfirmPswd] = useState<boolean>(false)

    useEffect(() => {
        // validate email
        const resEmail: boolean = EMAIL_REGEX.test(email)
        setValidEmail(resEmail)

        // validate password
        const resPswd: boolean = PSWD_REGEX.test(pswd)
        setValidPswd(resPswd)
        if (pswd) {
            const confirm: boolean = pswd === confirmPswd
            setValidConfirm(confirm)
        }
    }, [email, pswd, confirmPswd])

    const isValid:boolean = validEmail && validPswd && validConfirm

    const handleSubmit = async (e: FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()
        if (!isValid) {
            showToastMessage("error", "Invalid entry!")
            return
        }

        await axios.post(`${REGISTER_URL}`,
        JSON.stringify({ email, pswd, deviceInfo }), {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then((res: any) => {
            const { email, success }: any = res?.data
            setPswd("")
            setEmail("")
            setConfirmPswd("")
            setSuccess(success)
            setVerifyEmail(email)
        })
        .catch(err => {
            const statusCode = err.response?.status
            if (statusCode === 400) {
                showToastMessage("error", "Invalid credentials.")
            } else if (statusCode === 401) {
                showToastMessage("warning", "You already have an account.")
            } else {
                showToastMessage("error", "Something went wrong.")
            }
        })
    }

    const requestOtp = async (email: string):Promise<void> => {
        await axios.post(
            '/account/password/reset',
            JSON.stringify({ email }),
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        ).then((res: any) => {
            setUserId(email)
            showToastMessage("success", "OTP sent to your email.")
        }).catch(err => {
            showToastMessage("warning", err.response?.data?.message)
        })
    }

    const showToastMessage = (action: string, msg: string) => {
        if (action === "success") {
            toast.success(msg, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
        if (action === "warning") {
            toast.warning(msg, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
        if (action === "error") {
            toast.error(msg, {
                position: toast.POSITION.TOP_LEFT
            })
        }
    }

    return (
        <Context.Provider value={{
            Link, pswd, confirmPswd,
            setUserFocus, userFocus,
            setPswdFocus, validPswd,
            setPswd, setConfirmPswd,
            validConfirm, pswdFocus,
            setConfirmFocus, showPswd,
            setShowPswd, confirmFocus,
            showConfirmPswd, handleSubmit,
            setShowConfirmPswd, isValid,
            success, LOGIN_URL, setSuccess,
            setAuth, email, setEmail, auth,
            emailFocus, vCode, setVCode,
            setEmailFocus, vCodeFocus,
            validEmail, emailRef, EMAIL_REGEX,
            userRef, setVCodeFocus, verifyEmail,
            requestOtp, userId, setUserId,
            USER_REGEX, showToastMessage,
            ToastContainer
        }}>
            {children}
        </Context.Provider>
    )
}

const userContext: any = () => {
    const context:any = useContext(Context)
    if (context ===  undefined) {
        throw new Error("___");
    }
    return context
}

export default userContext