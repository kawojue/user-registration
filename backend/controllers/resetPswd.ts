import bcrypt from 'bcrypt'
import User from '../model/userSchema'
import { Request, Response } from 'express'
const asyncHandler = require('express-async-handler')

export const handleResetPswd = asyncHandler(async (req: Request, res: Response) => {
    const { userId, verified, pswd, deviceInfo } = req.body

    if (!userId || !pswd || !verified) {
        return res.status(400).json({
            success: false,
            message: 'Access denied.'
        })
    }

    const getUser: any = await User.findOne({ 'mail.email': userId }).exec()
    if (!getUser) {
        return res.status(404).json({
            success: false,
            message: 'User not found.'
        })
    }

    const oldPswd: string = getUser.password
    const isMatch: boolean = await bcrypt.compare(pswd, oldPswd)
    if (isMatch) {
        return res.status(400).json({
            success: false,
            message: "You input your current password."
        })
    }

    const hashedPswd = await bcrypt.hash(pswd, 12)
    getUser.password = hashedPswd
    getUser.deviceInfo = deviceInfo
    getUser.manageOTP = {}
    await getUser.save()

    res.json({
        success: true,
        message: "Password successfully changed."
    })
})