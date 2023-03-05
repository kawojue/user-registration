import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookie from 'cookie-parser'
import connectDB from './config/dbConn'
import authRoute from './routes/authRoutes'
import corsOptions from './config/corsOptions'
import express, { Application } from 'express'

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
app.use('/auth', authRoute)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB!')
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`)
    })
})