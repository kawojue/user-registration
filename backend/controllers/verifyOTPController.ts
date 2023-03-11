import { Request, Response } from 'express'
const asyncHandler = require('express-async-handler')

export const verify = asyncHandler(async (req: Request, res: Response) => {
    let { userId, otp, totp } = req.body
    otp = otp?.trim()
    userId = userId?.trim().toLowerCase()

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