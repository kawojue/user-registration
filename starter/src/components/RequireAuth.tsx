import userContext from '../hooks/useContext'
import { useLocation, Navigate, Outlet, Location } from 'react-router-dom'


const RequireAuth: React.FC = () => {
    const { auth }: any = userContext()
    const location: Location  = useLocation()

    return (
        auth?.username ? <Outlet/> : <Navigate to="/auth/login" state={{ from: location }} replace />
    )
}

export default RequireAuth