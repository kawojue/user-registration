import dotenv from 'dotenv'

dotenv.config()

export const allowedUrl: string = process.env.NODE_ENV === 'production' ? 'https://user-registration-kawojue.vercel.app' : 'http://localhost:5173'