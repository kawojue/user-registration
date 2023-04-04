import { useLocation, Navigate, Location } from 'react-router-dom'

interface IUseNavgate { to?: string, replace?: boolean }

const UseNavigate: React.FC<IUseNavgate> = ({ to = "/", replace = true }) => {
    const location: Location = useLocation()

    return (
        <Navigate to={to} replace={replace} state={{ from: location }}/>
    )
}

export default UseNavigate