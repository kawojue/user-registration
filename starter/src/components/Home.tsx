import axios from '../api/create'
import { customNav } from '../../utils/nav'
import userContext from '../hooks/useContext'

const Home: React.FC = () => {
    const {
        showToastMessage, Link,
        ToastContainer, setAuth
    }: any = userContext()

    const handleLogout = async () => {
        await axios.get('/auth/logout')
        .catch((err: any) => {
            console.error(err)
            showToastMessage("error", "Can't logout! Something went wrong.")
        })
        localStorage.removeItem("user")
        setAuth({})
        customNav({ from: '/linkpage' })
    }

    return(
        <>
            <ToastContainer />
            <main className="container home">
                <h1 className="section-h3">Home</h1>
                <p>You're logged in!</p>
                <article className="home-links">
                    <Link to="/employee">Go to Employee's page</Link>
                    <Link to="/admin">Go to Admin's page</Link>
                    <Link to="/lounge">Go to Lounge's page</Link>
                    <Link to="/linkpage">Go to Link's page</Link>
                </article>
                <button onClick={async () => await handleLogout()}>
                    Sign out
                </button>
            </main>
        </>
    )
}

export default Home