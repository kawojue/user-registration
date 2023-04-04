import UseNavigate from './UseNavigate'
import { Outlet } from 'react-router-dom'
import userContext from '../hooks/useContext'


const RequireUser = ({ allowedRoles }: { allowedRoles?: number[] }) => {
    const { auth }: any = userContext()

    return (
        auth?.roles?.find((role: number) => allowedRoles?.includes(role)) ?
        <Outlet/> : auth?.username && auth?.accessToken ?
        <UseNavigate to="/unauthorized" /> :
        <UseNavigate to="/auth/login" />
    )
}

export default RequireUser