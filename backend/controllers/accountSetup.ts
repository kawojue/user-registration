import User from '../model/userSchema'
import { Request, Response } from 'express'
const asyncHandler = require('express-async-handler')

export const handleAccountSetup = asyncHandler(async (req: Request, res: Response) => {
    let { userId, verifyEmail, vCode, totp, otpDate }: any = req.body
    userId = userId?.trim()?.toLowerCase()
    verifyEmail = verifyEmail?.trim()?.toLowerCase()

    const userExists: any = await User.findOne({ username: userId }).exec()
    const getUser: any = await User.findOne({ 'mail.email': verifyEmail }).exec()

    const expiry:number = otpDate + 60 * 60 * 1000

    if (!userId) {
        return res.status(400).json({
            message: "Invalid Input"
        })
    }

    if (!verifyEmail || !getUser) {
        return res.status(404).json({
            message: "Account not found."
        })
    }

    if (expiry < Date.now()) {
        return res.status(400).json({
            message: "OTP Expired."
        })
    }

    if (totp !== vCode) {
        return res.status(401).json({
            message: "Incorrect OTP"
        })
    }

    if (userExists) {
        return res.status(409).json({
            message: "Username taken."
        })
    }

    getUser.username = userId
    getUser.mail.isVerified = true
    await getUser.save()

    res.status(200).json({
        success: true,
        message: "Your email has been verified."
    })
})