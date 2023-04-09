import dotenv from 'dotenv'
import { CorsOptions } from 'cors'

dotenv.config()

export const allowedUrls: string[] = ['http://localhost:5173']

// const corsOptions: CorsOptions = {
//     credentials: true,
//     origin: allowedUrl,
//     optionsSuccessStatus: 200,
//     methods: ['GET', 'POST', 'DELETE', 'PATCH']
// }

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (allowedUrls.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

export default corsOptions