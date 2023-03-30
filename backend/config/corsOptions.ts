import dotenv from 'dotenv'
import { CorsOptions } from 'cors'

dotenv.config()

export const allowedUrl: string = process.env.NODE_ENV === 'production' ? process.env.PROD_URL : 'http://localhost:5173'

const corsOptions: CorsOptions = {
    origin: allowedUrl,
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH']
}

export default corsOptions