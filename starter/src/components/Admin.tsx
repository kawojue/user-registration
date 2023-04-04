import { Link } from "react-router-dom"
import Users from "./Users"

const Admin: React.FC = () => {
    return (
        <section className="container">
            <Users />
            <Link to="/">Go back</Link>
        </section>
    )
}

export default Admin