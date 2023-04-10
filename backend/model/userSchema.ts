import * as mongoose from 'mongoose'
const autoIncrement = require('mongoose-sequence')(mongoose)

const userShema = new mongoose.Schema(
    {
        mail: {
            email: {
                type: String,
                required: true,
                unique: true,
                sparse: true
            },
            isVerified: {
                type: Boolean,
                default: false
            }
        },
        username: {
            type: String,
            unique: true,
            sparse: true
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
            type: String
        }
    },
    {
        collection: 'usersDB',
        timestamps: true
    }
)

userShema.plugin(autoIncrement, {
    inc_field: 'user',
    id: 'userNums',
    start_req: 1
})

export default mongoose.model('userModel', userShema)