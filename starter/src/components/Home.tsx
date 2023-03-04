import userContext from "../hooks/Context"

const Home: React.FC = () => {
    const { Link } = userContext()

    return (
        <main>
            <nav className="navbar">
                <article className="nav-center">
                    <div>
                        <p>Homepage</p>
                    </div>
                    <ul>
                        <li>
                            <Link to="/auth/signup">Signup</Link>
                        </li>
                        <li>
                            <Link to="/auth/login">Login</Link>
                        </li>
                    </ul>
                </article>
            </nav>
            <article className="container">

            </article>
        </main>
    )
}

export default Home