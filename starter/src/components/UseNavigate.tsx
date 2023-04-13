import { useLocation, Navigate, Location } from 'react-router-dom'

interface IUseNavigate { to?: string, replace?: boolean }

const UseNavigate: React.FC<IUseNavigate> = ({ to = "/", replace = true }) => {
    const location: Location = useLocation()

    return (
        <Navigate to={to} replace={replace} state={{ from: location }}/>
    )
}

export default UseNavigate