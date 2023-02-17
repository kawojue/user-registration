import dotenv from 'dotenv'
import * as mongoose from 'mongoose'

dotenv.config()

const connectDB = () => {
    try {
        mongoose.connect(`${process.env.DATABASE_URI}`)
    } catch (err: any) {
        console.error(err)
    }
}

export default connectDB;