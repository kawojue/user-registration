import * as bcrypt from 'bcrypt'
import User from '../model/userSchema'
import { Request, Response } from 'express'
const asyncHandler = require('express-async-handler')

export const handleSignup = asyncHandler(async (req: Request, res: Response) => {
    const { email, pswd, deviceInfo }: any = req.body
    const mail: string = email?.toLowerCase().trim()

    const existingEmail: any = await User.findOne({ 'mail.email': mail }).exec()

    if (!pswd || !mail) return res.sendStatus(400)
    if (existingEmail) return res.sendStatus(401)

    const hashedPswd: string = await bcrypt.hash(pswd, 12)
    await User.create({
        mail: {
            email: mail
        },
        password: hashedPswd,
        deviceInfo
    })

    res.status(201).json({
        success: true,
        email: mail
    })
})