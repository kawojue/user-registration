import * as mongoose from 'mongoose'
const autoincrement = require('mongoose-sequence')(mongoose)

const userShema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
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
        verifiedMail: {
            type: Boolean,
            default: false
        },
        refreshToken: String
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