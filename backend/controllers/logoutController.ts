import User from '../model/userSchema'
import { CookieOptions, Request, Response } from 'express'

const clearCookies: CookieOptions = {
    httpOnly: true
}

export const handleLogout = async (req: Request, res: Response) => {
    const cookies:any = req.cookies
    if (!cookies?.loginCookie) return res.sendStatus(204)

    const refreshToken:string = cookies.loginCookie
    const existingUser = await User.findOne({ refreshToken }).exec()

    if (!existingUser) {
        res.clearCookie('loginCookie', clearCookies)
        res.sendStatus(204)
        return
    }

    existingUser.refreshToken = ""
    await existingUser.save()

    res.clearCookie('loginCookie', clearCookies)
    res.sendStatus(204)
}