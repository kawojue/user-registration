import cors from 'cors'
import logger from 'morgan'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookie from 'cookie-parser'
import connectDB from './config/dbConn'
import authRoute from './routes/authRoutes'
import corsOptions from './config/corsOptions'
import userRoute from './routes/api/userRoutes'
import accountRoute from './routes/accountRoutes'
import credentials from './middlewares/credentials'
import express, { Application, Request, Response } from 'express'

dotenv.config()
connectDB(`${process.env.DATABASE_URI}`)

const PORT = process.env.PORT || 2003
const app: Application = express()

// set middlewares
app.use(credentials)
app.use(express.json())
app.use(cookie())
app.use(logger('dev'))
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))

// set routes
app.use('/account', accountRoute)
app.use('/auth', authRoute)
app.use('/api', userRoute)


app.get("/", (req: Request, res: Response) => {
    return res.status(200).send("User Registration.")
})


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB!')
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`)
    })
})