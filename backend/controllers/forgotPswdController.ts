import User from '../model/userSchema'
import mailer from '../config/mailer'
import { Request, Response } from 'express'
import { generateOTP } from '../config/manageOTP'
const asyncHandler = require('express-async-handler')

export const handleForgotPswd = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body
    const otp = generateOTP()
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

    await mailer("Always Appear", mail, "Forgot Password", `Code: ${otp}`)

    res.status(200).json({
        success: true,
        totp: otp
    })
})