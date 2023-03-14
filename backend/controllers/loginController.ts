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
    maxAge: 5 * 24 * 60 * 60 * 1000
}

export const handleLogin = asyncHandler(async (req: Request, res: Response) => {
    let { user, pswd, deviceInfo } = req.body
    const EMAIL_REGEX:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    let existingUser: any
    const isEmail = EMAIL_REGEX.test(user)
    const userId: string = user?.trim().toLowerCase()
    const { name: devName, os: devOs}: any = deviceInfo

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
    const { name: exDevName, os: exDevOs }: any = await existingUser.deviceInfo
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
        { expiresIn: '3m' }
    )
    const refreshToken: Secret = jwt.sign(
        { "userId": username },
        `${process.env.SECRET_REFRESH_TOKEN}`,
        { expiresIn: '5d' }
    )

    const text: string = `Hi ${username?.toLowerCase()},\n\n\nA successful login just occurred at ${devName?.toUpperCase()} ${devOs?.toUpperCase()} on ${new Date()}.\nIf you did not initiate this login, please visit http://localhost:5173/account/password/reset to reset your password.`

    if (devName !== exDevName || devOs !== exDevOs) {
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
