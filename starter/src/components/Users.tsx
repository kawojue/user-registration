import axios from '../api/create'
import { useState, useEffect } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'

const Users: React.FC = () => {
    const [users, setUsers] = useState<any[]>([])
    const refresh: () => Promise<string> = useRefreshToken()

    useEffect(() => {
        let isMounted = true
        const controller: AbortController = new AbortController()

        const fetchUsers = async (): Promise<void> => {
            await axios.get('/api/all/users', {
                signal: controller.signal
            })
            .then((res: any) => {
                isMounted && setUsers(res?.data?.users)
            }).catch((err: any) => {
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
            <button className="refresh-btn hover:bg-pry-clr-0"
            onClick={() => refresh()}>
                Refresh
            </button>
            <br />
        </article>
    )
}

export default Users