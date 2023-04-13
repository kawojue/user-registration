import { useEffect } from 'react'
import userContext from './useContext'
import { axiosPrivate } from '../api/create'
import useRefreshToken from './useRefreshToken'
import { AxiosResponse, AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const useAxiosPrivate = (): AxiosInstance => {
    const refresh = useRefreshToken()
    const { auth }: any = userContext()

    useEffect(() => {
        const resIntercept: number = axiosPrivate.interceptors.response.use(
            (response: AxiosResponse<any, any>) => response,
            async (error) => {
                const prevReq = error?.config
                if (error?.response?.status === 403 && !prevReq?.sent) {
                    prevReq.sent = true
                    const newAccessToken = await refresh()
                    prevReq.headers["Authorization"] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevReq)
                }
            }
        )

        return () => {
            axiosPrivate.interceptors.response.eject(resIntercept)
        }
    }, [refresh, auth])
    
    return axiosPrivate
}

export default useAxiosPrivate