import userContext from "../hooks/Context"

const Home: React.FC = () => {
    const { Link } = userContext()

    return (
        <main className="homepage">
            <nav className="navbar">
                <article className="nav-center">
                    <div>
                        <p>Homepage</p>
                    </div>
                    <ul>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </article>
            </nav>
        </main>
    )
}

export default Home