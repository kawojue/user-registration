import * as bcrypt from 'bcrypt'
import User from '../model/userSchema'
import { Request, Response } from 'express'
const asyncHandler = require('express-async-handler')

export const handleSignup = asyncHandler(async (req: Request, res: Response) => {
    const { email, user, pswd } = req.body
    const username = user.toLowerCase()

    const existingUser: any = await User.findOne({ username }).exec()
    const existingEmail: any = await User.findOne({ email }).exec()

    if (!username || !pswd || email) return res.sendStatus(400)
    if (existingUser) return res.sendStatus(409)
    if (existingEmail) return res.sendStatus(401)

    const hashedPswd = await bcrypt.hash(pswd, 12)
    await User.create({
        username,
        password: hashedPswd
    })
    return res.sendStatus(201)
})