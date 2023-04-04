import axios from 'axios'
import { useState, useEffect } from 'react'

const Users: React.FC = () => {
    const [users, setUsers] = useState<any[]>([])

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
            <h3>Users List</h3>
            {
                users?.length ? (
                    <ul>
                        {users.map((user: any, idx: number) => (
                            <li key={idx}>{user?.username}</li>
                        ))}
                    </ul>
                ) : <p>No users.</p>
            }
        </article>
    )
}

export default Users