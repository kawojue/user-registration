import dotenv from 'dotenv'
import * as bcrypt from 'bcrypt'
import mailer from '../config/mailer'
import User from '../model/userSchema'
import jwt, { Secret } from 'jsonwebtoken'
const asyncHandler = require('express-async-handler')
import { CookieOptions, Request, Response } from 'express'

dotenv.config()

const newCookie: CookieOptions = {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000
}

export const handleLogin = asyncHandler(async (req: Request, res: Response) => {
    const { user, pswd, deviceInfo } = req.body
    const EMAIL_REGEX:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    let existingUser: any
    const isEmail = EMAIL_REGEX.test(user)
    const userId: string = user.toLowerCase().trim()

    if (isEmail) {
        existingUser = await User.findOne({ 'mail.email': userId })
    } else {
        existingUser = await User.findOne({ username: userId })
    }

    if (!userId || !pswd || !existingUser) {
        return res.status(400).json({
            success: false,
            message: "Invalid user ID or password."
        })
    }

    const username: string = await existingUser.username
    const existedDevInfo: any = await existingUser.deviceInfo
    const checkPswd: boolean = await bcrypt.compare(pswd, existingUser.password)

    if (!checkPswd) {
        return res.status(401).json({
            success: false,
            message: "Incorrect password."
        })
    }

    const roles = Object.values(existingUser.roles).filter(Boolean)
    const accessToken: Secret = jwt.sign(
        {
            "userInfo": {
                "userId": username,
                "roles": roles
            }
        },
        `${process.env.SECRET_ACCESS_TOKEN}`,
        { expiresIn: '1h' }
    )
    const refreshToken: Secret = jwt.sign(
        { "userId": username },
        `${process.env.SECRET_REFRESH_TOKEN}`,
        { expiresIn: '7d' }
    )

    const text: string = `Hello ${username.toUpperCase()},\n\n\nA successful login just occurred at ${deviceInfo?.name.toUpperCase()} ${deviceInfo?.os.toUpperCase()} on ${new Date()}.\nIf you did not initiate this login, please visit http://localhost:5173/account/reset to reset your password.`

    if (deviceInfo?.name !== existedDevInfo?.name || deviceInfo?.os !== existedDevInfo?.os) {
        await mailer('Kawojue Raheem', existingUser.mail.email, 'Login Notification', text)
    }

    existingUser.deviceInfo = deviceInfo
    existingUser.refreshToken = refreshToken
    await existingUser.save()

    res.cookie('loginCookie', refreshToken, newCookie)
    res.json({
        success: true,
        username,
        email: existingUser.mail.email,
        accessToken,
        roles
    })
})