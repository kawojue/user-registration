import userContext from '../hooks/useContext'
import { useLocation, Navigate, Outlet, Location } from 'react-router-dom'


const RequireUser = ({ allowedRoles }: { allowedRoles?: number[] }) => {
    const { auth }: any = userContext()
    const location: Location  = useLocation()

    return (
        auth?.roles?.find((role: number) => allowedRoles?.includes(role)) ?
        <Outlet/> : auth?.username && auth?.accessToken ?
        <Navigate to="/unauthorized" state={{ from: location }} replace /> :
        <Navigate to="/auth/login" state={{ from: location }} replace />
    )
}

export default RequireUser