import axios from '../api/create'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Dashboard: React.FC = () => {
    const nav = useNavigate()
    const { id } = useParams()
    const isValidParam = id?.startsWith('@')
    const userId: string | undefined = id?.slice(1)

    const handleUser = async (ID: string | undefined) => {
        await axios.get(`${ID}`).then(res => {
            console.log(res?.data)
        }).catch(err => {
            if (err?.response.status === 404) {
                nav('*')
            } else {
                console.log('Network error')
            }
        })
    }

    useEffect(() => {
        if (isValidParam) {
            (async () => await handleUser(userId))()
        } else {
            nav(`/@${id}`)
        }
    }, [])

    return (
        <p>{id}</p>
    )
}

export default Dashboard