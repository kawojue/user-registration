import axios from 'axios'

const url: string = process.env.NODE_ENV === 'production' ? 'https://user-registration-backend-tawny.vercel.app' : 'http://localhost:2003'

export default axios.create({
    baseURL: url
})