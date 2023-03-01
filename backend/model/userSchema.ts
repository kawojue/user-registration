import * as mongoose from 'mongoose'
const autoincrement = require('mongoose-sequence')(mongoose)

const userShema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        refreshToken: String
    },
    {
        timestamps: true
    }
)

userShema.plugin(autoincrement, {
    inc_field: 'user',
    id: 'userNums',
    start_req: 1
})

export default mongoose.model('userModel', userShema)