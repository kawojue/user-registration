import { useEffect } from 'react'
import userContext from './useContext'
import { axiosPrivate } from '../api/create'
import useRefreshToken from './useRefreshToken'
import { AxiosResponse, AxiosInstance } from 'axios'

const useAxiosPrivate = (): AxiosInstance => {
    const refresh = useRefreshToken()
    const { auth }: any = userContext()

    useEffect(() => {
        const reqIntercept: number = axiosPrivate.interceptors.request.use(
            (config: any) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${auth?.accessToken}`
                }
                return config
            },
            (error: any) => Promise.reject(error)
        )

        const resIntercept: number = axiosPrivate.interceptors.response.use(
            (response: AxiosResponse<any, any>) => response,
            async (error: any) => {
                const prevReq = error?.config
                if (error?.response?.status === 403 && !prevReq?.sent) {
                    prevReq.sent = true
                    const newAccessToken = await refresh()
                    prevReq.headers["Authorization"] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevReq)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(reqIntercept)
            axiosPrivate.interceptors.response.eject(resIntercept)
        }
    }, [refresh, auth])
    
    return axiosPrivate
}

export default useAxiosPrivate