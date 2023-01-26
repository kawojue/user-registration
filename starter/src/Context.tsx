import { Link } from 'react-router-dom'
import React, { createContext, useContext } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { FaInfoCircle, FaTimes, FaCheck } from 'react-icons/fa'

const Context: any | null = createContext({})

export const UserProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    return (
        <Context.Provider value={{
            AiFillEyeInvisible, AiFillEye,
            FaInfoCircle, FaTimes, FaCheck,
            Link
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