import React, { createContext, useContext, useRef, useState, useEffect } from 'react'

const Context:any | null = createContext({})

export const RegisterProvider: React.FC<{children: React.ReactElement}> = ({ children }) => {
    const USER_REGEX:RegExp = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
    const PSWD_REGEX:RegExp = /^(?=(.*[a-z]){2,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{5,}$/

    const errRef = useRef<any>()
    const userRef = useRef<any>()

    const [user, setUser] = useState<string>('')
    const [validName, setValidName] = useState<boolean>(false)
    const [userFocus, setUserFocus] = useState<boolean>(false)

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
        userRef.current?.focus()
    }, [])


    useEffect(() => {
        // validate user
        const resUser:boolean = USER_REGEX.test(user)
        setValidName(resUser)

        // validate password
        const resPswd:boolean = PSWD_REGEX.test(pswd)
        setValidPswd(resPswd)
        if (pswd) {
            const confirm = pswd === confirmPswd
            setValidConfirm(confirm)
        }
    }, [user, pswd, confirmPswd])

    useEffect(() => {
        setErrMsg('')
    }, [user, pswd, confirmPswd])

    

    return (
        <Context.Provider value={{
            errMsg, errRef, user, pswd,
            confirmPswd, userRef, setUserFocus,
            validName, userFocus, pswdFocus,
            setPswdFocus, validPswd, setUser,
            setPswd, setConfirmPswd, validConfirm,
            setConfirmFocus, showPswd, setShowPswd,
            confirmFocus, showConfirmPswd, setShowConfirmPswd
        }}>
            {children}
        </Context.Provider>
    )
}

const registerContext: any = () => {
    const context:any = useContext(Context)
    if (context === undefined) {
        throw new Error('Use Provider')
    }
    return context
}

export default registerContext