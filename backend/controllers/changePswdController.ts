import bcrypt from 'bcrypt'
import User from '../model/userSchema'
import { Request, Response } from 'express'
const asyncHandler = require('express-async-handler')

export const handleChangePswd = asyncHandler(async (req: Request, res: Response) => {
    const { userId, verified, pswd } = req.body

    if (!userId || !pswd || !verified) {
        return res.status(400).json({
            success: false,
            message: 'Access denied.'
        })
    }

    const getUser: any = await User.findOne({ 'mail.email': userId }).exec()

    if (getUser) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }

    const hashedPswd = await bcrypt.hash(pswd, 12)
    getUser.password = hashedPswd
    await getUser.save()

    res.json({
        success: true,
        message: "Password successfully changed."
    })
})