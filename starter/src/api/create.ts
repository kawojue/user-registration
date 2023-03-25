import axios from 'axios'

const url: string = process.env.NODE_ENV === 'production' ? 'user-registration-backend-opal.vercel.app' : 'http://localhost:2003'

export default axios.create({
    baseURL: url
})