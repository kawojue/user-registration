import * as bcrypt from 'bcrypt'
import User from '../model/userSchema'
import { Request, Response } from 'express'
const asyncHandler = require('express-async-handler')

export const handleSignup = asyncHandler(async (req: Request, res: Response) => {
    const { email, user, pswd, deviceInfo } = req.body

    const mail: string = email?.toLowerCase().trim()
    const username: string = user?.toLowerCase().trim()

    const existingUser: any = await User.findOne({ username }).exec()
    const existingEmail: any = await User.findOne({ 'mail.email': mail }).exec()

    if (!username || !pswd || !mail) return res.sendStatus(400)
    if (existingEmail) return res.sendStatus(401)
    if (existingUser) return res.sendStatus(409)

    const hashedPswd: string = await bcrypt.hash(pswd, 10)
    await User.create({
        username,
        mail: {
            email: mail
        },
        password: hashedPswd,
        deviceInfo
    })
    res.status(201).json({
        success: true
    })
})