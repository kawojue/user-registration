import * as mongoose from 'mongoose'
const autoincrement = require('mongoose-sequence')(mongoose)

const userShema = new mongoose.Schema(
    {
        mail: {
            email: {
                type: String,
                required: true,
                unique: true
            },
            isVerified: {
                type: Boolean,
                default: false
            }
        },
        username: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        roles: {
            User: {
                type: Number,
                default: 9823
            },
            Admin: Number,
            Employee: Number,
        },
        loginToken: String,
        refreshToken: String,
        deviceInfo: {
            name: String,
            version: String,
            os: String
        },
        manageOTP: {
            totp: String,
            totpDate: Number
        },
        lastLogout: {
            type: Date
        }
    },
    {
        collection: 'usersDB',
        timestamps: true
    }
)

userShema.plugin(autoincrement, {
    inc_field: 'user',
    id: 'userNums',
    start_req: 1
})

export default mongoose.model('userModel', userShema)