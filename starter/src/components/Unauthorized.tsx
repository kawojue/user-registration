import { useNavigate, NavigateFunction } from "react-router-dom"

const Unauthorized: React.FC = () => {
    const navigate: NavigateFunction = useNavigate()
    const goBack = (): void => navigate(-1)

    return (
        <section className="container">
            <h3 className="section-h3 mb-9">
                Unauthorized
            </h3>
            <p>You don't have access to this page.</p>
            <button onClick={goBack} className="mt-5 underline">
                Go Back
            </button>
        </section>
    )
}

export default Unauthorized