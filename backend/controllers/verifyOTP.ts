import { IGenOTP } from '../config/manageOTP'
import User from '../model/userSchema'
import { Request, Response } from 'express'
const asyncHandler = require('express-async-handler')

export const verify = asyncHandler(async (req: Request, res: Response) => {
    let { userId, otp }: any = req.body
    otp = otp?.trim()
    userId = userId?.trim()?.toLowerCase()

    const getUser = await User.findOne({ 'mail.email': userId }).exec()
    const totp: string = getUser?.manageOTP.totp
    const totpDate: number = getUser?.manageOTP.totpDate
    const expiry: number = totpDate + 60 * 60 * 1000 // after 1hr

    if (!getUser || !userId) {
        return res.status(404).json({
            message: "Account not found!"
        })
    }

    if (expiry < Date.now()) {
        return res.status(400).json({
            message: "OTP Expired."
        })
    }

    if (totp !== otp) {
        return res.status(401).json({
            message: "Incorrect OTP"
        })
    }

    res.status(200).json({
        verified: true,
        userId
    })
})