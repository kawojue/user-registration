import axios, { AxiosInstance } from 'axios'

const BASE_URL: string = process.env.NODE_ENV === 'production' ? 'https://user-registration-backend-tawny.vercel.app' : 'http://localhost:2003'

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

export const axiosPrivate: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})