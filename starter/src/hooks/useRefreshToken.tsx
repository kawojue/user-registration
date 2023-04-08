import axios from '../api/create'
import { AxiosResponse } from 'axios'
import userContext from "./useContext"

const useRefreshToken = () => {
    const { setAuth }: any = userContext()
    
    const refresh = async (): Promise<string> => {
        const res: AxiosResponse<any, any> = await axios.get(
            '/auth/refresh',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        )
        setAuth((prevState: any) => {
            console.log(JSON.stringify(prevState))
            console.log(res?.data?.accessToken)
            return {
                ...prevState,
                accessToken: res?.data?.accessToken as string
            }
        })
        return res?.data?.accessToken as string
    }

    return refresh
}

export default useRefreshToken