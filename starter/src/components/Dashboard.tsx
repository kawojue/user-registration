import axios from '../api/create'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Dashboard: React.FC = () => {
    const nav = useNavigate()
    const { id } = useParams()
    const userId: string | undefined = id?.slice(1)
    const handleUser = async (ID: string | undefined):Promise<void> => {
        await axios.get(`${ID}`)
        .then(res => {
            console.log(res?.data)
        }).catch(err => {
            if (err?.response.status === 404) {
                nav('*')
            }
        })
    }

    useEffect(() => {
        (async () => await handleUser(userId))()
    })
    return (
        <p>{id}</p>
    )
}

export default Dashboard