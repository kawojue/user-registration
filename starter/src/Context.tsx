import { Link } from 'react-router-dom'
import { FaInfoCircle, FaTimes, FaCheck } from 'react-icons/fa'
import React, { createContext, useContext, useRef, useState, useEffect } from 'react'

const Context:any | null = createContext({})

export const DataProvider: React.FC<{children: React.ReactElement}> = ({ children }) => {
    const USER_REGEX:RegExp = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
    const PSWD_REGEX:RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,32}$/

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

    const [success, setSuccess] = useState<boolean>(false)
    const [errMsg, setErrMsg] = useState<string | null>(null)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>):void => {
        const value = e.target.value
        setUser(value)
        setPswd(value)
        setConfirmPswd(value)
    }


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
        const confirm = pswd === confirmPswd
        setValidConfirm(confirm)
    }, [user, pswd, confirmPswd])

    useEffect(() => {
        setErrMsg('')
    }, [user, pswd, confirmPswd])

    

    return (
        <Context.Provider value={{
            FaCheck, FaTimes, FaInfoCircle,
            Link, errMsg, errRef, user, pswd,
            confirmPswd, userRef, setUserFocus,
            validName, userFocus, pswdFocus,
            setPswdFocus, validPswd, onChangeHandler
        }}>
            {children}
        </Context.Provider>
    )
}

const userContext: any = () => {
    const context = useContext(Context)
    if (context === undefined) {
        throw new Error('Use Provider')
    }
    return context
}

export default userContext