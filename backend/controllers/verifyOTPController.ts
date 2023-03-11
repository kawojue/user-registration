import { Request, Response } from 'express'
const asyncHandler = require('express-async-handler')

export const verify = asyncHandler(async (req: Request, res: Response) => {
    let { userId, otp, totp, date }: any = req.body
    otp = otp?.trim()
    userId = userId?.trim().toLowerCase()

    const expiry:number = date + 180*1000

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