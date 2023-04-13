import { useState, useEffect } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useNavigate, useLocation, NavigateFunction, Location } from 'react-router-dom'

const Users: React.FC = () => {
    const axiosPrivate = useAxiosPrivate()
    const location: Location = useLocation()
    const [users, setUsers] = useState<any[]>([])
    const navigate: NavigateFunction = useNavigate()

    useEffect(() => {
        let isMounted = true
        const controller: AbortController = new AbortController()

        const fetchUsers = async (): Promise<void> => {
            await axiosPrivate.get('/api/all/users', {
                signal: controller.signal
            })
            .then((res: any) => {
                isMounted && setUsers(res?.data?.users)
            }).catch((err: any) => {
                navigate('/login', { state: { from: location }, replace: true })
                console.error(err)
            })
        };

        (async () => await fetchUsers())();

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    return (
        <article>
            <h3 className="section-h3">Users List</h3>
            {
                users?.length ? (
                    <ul>
                        {users.map((user: any, idx: number) => (
                            <li key={idx}>{user?.username}</li>
                        ))}
                    </ul>
                ) : <p>No users.</p>
            }
            <br />
        </article>
    )
}

export default Users