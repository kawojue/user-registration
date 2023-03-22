import axios from '../api/create'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Dashboard: React.FC = () => {
    const nav = useNavigate()
    const { id }: any = useParams()
    const userId: string = id.slice(1)

    const handleUser = async (ID: string) => {
        await axios.get(`${ID}`)
            .then(res => {
                console.log(res?.data)
            })
            .catch(err => {
                const statusCode:number = err?.response.status
                if (statusCode === 404) {
                    nav('*')
                } else if (statusCode === 401) {
                    console.log('Unautorized')
                } else {
                    console.log('Network error')
                }
            })
    }

    useEffect(() => {
        (async () => await handleUser(userId))()
    }, [])

    return (
        <p>{id}</p>
    )
}

export default Dashboard