import { Outlet } from "react-router-dom"

const Layout: React.FC = () => {
    return (
        <main className="app">
            <Outlet />
        </main>
    )
}

export default Layout