import { Outlet, Link } from "react-router-dom"

const Layout: React.FC = () => {
    return (
        <main className="app">
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
            <Outlet />
        </main>
    )
}

export default Layout