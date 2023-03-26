import axios from '../api/create'
import { useNavigate, NavigateFunction } from "react-router-dom"
import userContext from '../hooks/useContext'

const Home: React.FC = () => {
    const { setAuth, Link }: any = userContext()
    const navigate: NavigateFunction = useNavigate()

    const handleLogout = async () => {
        await axios.get('/auth/logout')
        setAuth({})
        navigate('/linkpage', { replace: true })
    }

    return(
        <main className="container home">
            <h1 className="section-h3">Home</h1>
            <p>You're logged in!</p>
            <article className="home-links">
                <Link to="/editor">Go to Editor's page</Link>
                <Link to="/admin">Go to Admin's page</Link>
                <Link to="/lounge">Go to Lounge's page</Link>
                <Link to="/linkpage">Go to Link's page</Link>
            </article>
            <button onClick={async () => await handleLogout()}>
                Sign out
            </button>
        </main>
    )
}

export default Home