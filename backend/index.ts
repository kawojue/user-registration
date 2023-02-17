import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectDB from './config/dbConn'
import corsOptions from './config/corsOptions'
import errorHandler from './middlewares/errorHandler'
import express, { Application } from 'express'

connectDB()
dotenv.config()
const PORT = process.env.PORT
const app: Application = express()

// set middlewares
app.use(errorHandler)
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB!')
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`)
    })
})