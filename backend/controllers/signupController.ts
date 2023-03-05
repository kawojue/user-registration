import * as bcrypt from 'bcrypt'
import User from '../model/userSchema'
import { Request, Response } from 'express'
const asyncHandler = require('express-async-handler')

export const handleSignup = asyncHandler(async (req: Request, res: Response) => {
    const { email, user, pswd } = req.body

    const mail: string = email.toLowerCase()
    const username: string = user.toLowerCase()

    const existingUser: any = await User.findOne({ username }).exec()
    const existingEmail: any = await User.findOne({ email: mail }).exec()

    if (!user || !pswd || !email) return res.sendStatus(400)
    if (existingUser) return res.sendStatus(409)
    if (existingEmail) return res.sendStatus(401)

    const hashedPswd: string = await bcrypt.hash(pswd, 10)
    await User.create({
        username,
        email: mail,
        password: hashedPswd
    })
    res.sendStatus(201)
})