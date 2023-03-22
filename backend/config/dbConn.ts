import dotenv from 'dotenv'
import * as mongoose from 'mongoose'

dotenv.config()

const connectDB = async (DATABASE_URI: string) => {
    try {
        await mongoose.connect(DATABASE_URI)
    } catch (err: any) {
        console.error(err)
    }
}

export default connectDB;