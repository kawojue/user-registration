import mailer from '../config/mailer'
import User from '../model/userSchema'
import { Request, Response } from 'express'
import { manageOTP } from '../config/manageOTP'
const asyncHandler = require('express-async-handler')

export const handleForgotPswd = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body
    const mail: string = email?.toLowerCase().trim()

    const exists: any = await User.findOne({ 'mail.email': mail }).exec()

    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email address.'
        })
    }

    if (!exists) {
        return res.status(401).json({
            success: false,
            message: 'Account does not exist.'
        })
    }

    const { totp, secret } = manageOTP()
    await mailer('Always Appear', exists.mail?.email, 'Forgot Password', `Code: ${totp}`)

    res.status(200).json({
        success: true,
        secret
    })
})