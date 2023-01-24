import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createContext, useContext, useRef, useState, useEffect } from 'react'
import {faCheck, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons'

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

    const [matchPswd, setMatchPswd] = useState<string>('')
    const [validMatch, setValidMatch] = useState<boolean>(false)
    const [macthFocus, setMatchFocus] = useState<boolean>(false)

    const [errMsg, setErrMsg] = useState<string>('')
    const [success, setSuccess] = useState<boolean>(false)

    return (
        <Context.Provider value={{
            faCheck, faTimes, faInfoCircle,
            Link, FontAwesomeIcon,
        }}>
            {children}
        </Context.Provider>
    )
}

const userContext: any = () => {
    const context = useContext(Context)
    if (context === 'undefined') {
        throw new Error('Use Provider')
    }
    return context
}

export default userContext