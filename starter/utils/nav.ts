import { useLocation, useNavigate, NavigateFunction, Location } from 'react-router-dom'

const nav = ({ replace = true }: { replace?: boolean }): any => {
    const location: Location = useLocation()
    const navigate: NavigateFunction = useNavigate()
    const from: string = location.state?.from?.pathname || '/'

    return navigate(from, { replace })
}

interface INav {
    from?: string,
    replace?: boolean
}

export const customNav = ({ from = "/", replace = true }: INav): any => {
    const navigate: NavigateFunction = useNavigate()
    return navigate(from, { replace })
}

export default nav