import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cookie from 'cookie-parser'
import mongoose from 'mongoose'
import connectDB from './config/dbConn'
import signupRoute from './routes/signup'
import corsOptions from './config/corsOptions'
import express, { Application } from 'express'
import errorHandler from './middlewares/errorHandler'

connectDB()
dotenv.config()
const PORT = process.env.PORT
const app: Application = express()

// set middlewares
app.use(cookie())
app.use(errorHandler)
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))

// set routes
app.use('/', signupRoute)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB!')
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`)
    })
})