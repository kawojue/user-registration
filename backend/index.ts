import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookie from 'cookie-parser'
import connectDB from './config/dbConn'
import authRoute from './routes/authRoutes'
import express, { Application } from 'express'
import corsOptions from './config/corsOptions'
import userRoute from './routes/api/userRoutes'
import accountRoute from './routes/accountRoutes'

connectDB()
dotenv.config()
const PORT = process.env.PORT || 2003
const app: Application = express()

// set middlewares
app.use(cookie())
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))

// set routes
app.use('/account', accountRoute)
app.use('/auth', authRoute)
app.use('/', userRoute)


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB!')
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`)
    })
})