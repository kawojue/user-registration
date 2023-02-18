import * as mongoose from 'mongoose'

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
})

export default mongoose.model('userModel', userShema)