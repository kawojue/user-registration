import User from '../model/userSchema'
const asyncHandler = require('express-async-handler')
import { CookieOptions, Request, Response } from 'express'

const clearCookies: CookieOptions = {
    httpOnly: true
}

export const handleLogout = asyncHandler (async (req: Request, res: Response) => {
    const cookies: any = req.cookies
    if (!cookies?.auth) return res.sendStatus(204)

    const refreshToken: string = cookies.auth
    const existingUser = await User.findOne({ refreshToken }).exec()

    if (!existingUser) {
        res.clearCookie('auth', clearCookies)
        return res.sendStatus(204)
    }

    existingUser.refreshToken = ""
    existingUser.lastLogout = `${new Date()}`
    await existingUser.save()

    res.clearCookie('auth', clearCookies)
    res.sendStatus(204)
})