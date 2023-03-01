import * as bcrypt from 'bcrypt'
import User from '../model/userSchema'
import { Request, Response } from 'express'

export const handleSignup = async (req: Request, res: Response) => {
    const { user, pswd } = req.body
    const username = user.toLowerCase()

    const existingUser = await User.findOne({ username }).exec()

    if (!username || !pswd) return res.sendStatus(400)
    if (existingUser) return res.sendStatus(409)

    try {
        const hashedPswd = await bcrypt.hash(pswd, 12)
        await User.create({
            username,
            password: hashedPswd
        })
        return res.sendStatus(201)
    } catch (err: any) {
        return res.sendStatus(500)
    }
}