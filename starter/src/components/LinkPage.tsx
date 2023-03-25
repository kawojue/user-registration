import { Link } from 'react-router-dom'

const LinkPage: React.FC = () => {
    return (
        <main className="container home">
            <h1 className="section-h3">Links</h1>
            <section>
                <h3 className="section-h3">Public</h3>
                <article className="home-links">
                    <Link to="/auth/login">Login</Link>
                    <Link to="/auth/signup">Signup</Link>
                </article>
            </section>
            <section>
                <h3 className="section-h3">Private</h3>
                <article className="home-links">
                    <Link to="/">Home</Link>
                    <Link to="/editor">Editor's page</Link>
                    <Link to="/admin">Admin's page</Link>
                </article>
            </section>
        </main>
    )
}

export default LinkPage