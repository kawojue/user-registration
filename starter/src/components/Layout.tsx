import { Outlet } from "react-router-dom"

const Layout: React.FC = () => {
    return (
        <main className="container">
            <Outlet />
        </main>
    )
}

export default Layout