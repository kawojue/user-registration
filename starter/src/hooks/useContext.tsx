import axios from '../api/create'
import { detect } from 'detect-browser'
import { Link } from 'react-router-dom'
import React, { createContext, useContext, useRef, useState, useEffect, FormEvent } from 'react'

const Context: any | null = createContext({})

export const UserProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const LOGIN_URL:string = "/auth/login"
    const REGISTER_URL:string = "/auth/signup"
    const USER_REGEX:RegExp = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/
    const EMAIL_REGEX:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const PSWD_REGEX:RegExp = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{4,89}$/
    
    const deviceInfo = detect()

    const errRef = useRef<any>()
    const userRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const [auth, setAuth] = useState<any>({})

    const [user, setUser] = useState<string>('')
    const [validName, setValidName] = useState<boolean>(false)
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

    const [errMsg, setErrMsg] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)
    
    const [showPswd, setShowPswd] = useState<boolean>(false)
    const [showConfirmPswd, setShowConfirmPswd] = useState<boolean>(false)

    useEffect(() => {
        setErrMsg('')
    }, [email, user, pswd, confirmPswd])

    useEffect(() => {
        // validate email
        const resEmail:boolean = EMAIL_REGEX.test(email)
        setValidEmail(resEmail)

        // validate user
        const resUser:boolean = USER_REGEX.test(user)
        setValidName(resUser)

        // validate password
        const resPswd:boolean = PSWD_REGEX.test(pswd)
        setValidPswd(resPswd)
        if (pswd) {
            const confirm:boolean = pswd === confirmPswd
            setValidConfirm(confirm)
        }
    }, [email, user, pswd, confirmPswd])

    useEffect(() => {
        setErrMsg("")
    }, [email, pswd])

    const isValid:boolean = validEmail && validPswd && validConfirm

    const handleSubmit = async (e: FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()
        if (!isValid) {
            return setErrMsg('Warning! Invalid Entry.')
        }

        await axios.post(`${REGISTER_URL}`,
        JSON.stringify({ email, pswd, deviceInfo }), {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then((res: any) => {
            setPswd("")
            setEmail("")
            setConfirmPswd("")
            setVerifyEmail(res?.data.email)
            setSuccess(res?.data.success)
        })
        .catch(err => {
            const statusCode = err.response?.status
            if (statusCode === 400) {
                setErrMsg("Invalid credentials.")
            } else if (statusCode === 401) {
                setErrMsg("You already have an account.")
            } else {
                setErrMsg("Something went wrong.")
            }
            setTimeout(() => {
                setErrMsg("")
            }, 3500);
        })
    }

    return (
        <Context.Provider value={{
            Link, errMsg, errRef, user, pswd,
            confirmPswd, setUserFocus,
            validName, userFocus, pswdFocus,
            setPswdFocus, validPswd, setUser,
            setPswd, setConfirmPswd, validConfirm,
            setConfirmFocus, showPswd, setShowPswd,
            confirmFocus, showConfirmPswd, handleSubmit,
            setShowConfirmPswd, isValid, success,
            LOGIN_URL, setErrMsg, setSuccess, setAuth,
            email, setEmail, emailFocus, setEmailFocus,
            validEmail, emailRef, auth, EMAIL_REGEX,
            userRef, vCode, setVCode, vCodeFocus,
            setVCodeFocus, verifyEmail
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