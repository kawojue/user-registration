import GoBack from "./GoBack"

const Unauthorized: React.FC = () => {
    return (
        <section className="container">
            <h3 className="section-h3 mb-9">
                Unauthorized
            </h3>
            <p>You don't have access to this page.</p>
            <GoBack />
        </section>
    )
}

export default Unauthorized