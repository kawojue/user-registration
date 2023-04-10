import dotenv from 'dotenv'
import * as bcrypt from 'bcrypt'
import User from '../model/userSchema'
import jwt, { Secret } from 'jsonwebtoken'
import { allowedUrls } from '../config/corsOptions'
import mailer, { IMailer } from '../config/mailer'
const asyncHandler = require('express-async-handler')
import { CookieOptions, Request, Response } from 'express'

dotenv.config()

const newCookie: CookieOptions = process.env.NODE_ENV === 'production' ? {
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
    sameSite: 'none',
    secure: true
} : {
    httpOnly: true,
    maxAge: 5 * 60 * 1000,
    secure: false // 5 mins
}

export const handleLogin = asyncHandler(async (req: Request, res: Response) => {
    let { user, pswd, deviceInfo }: any = req.body
    const EMAIL_REGEX: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const isEmail: boolean = EMAIL_REGEX.test(user)
    const userId: string = user?.trim()?.toLowerCase()
    const { name: devName, os: devOs, version: devVersion }: any = deviceInfo

    const existingUser: any = await User.findOne(
        isEmail ? { 'mail.email': userId } : { username: userId }
    ).exec()

    if (!userId || !pswd || !existingUser) {
        return res.status(400).json({
            success: false,
            message: "Invalid user ID or password."
        })
    }

    const username: string = existingUser?.username
    const { name: exDevName, os: exDevOs, version: exDevVersion }: any = existingUser?.deviceInfo
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

    const text: string = `Hi ${username?.toUpperCase()},\n\n\nA successful login just occurred at ${devName?.toUpperCase()} ${devOs?.toUpperCase()} on ${new Date()}.\nIf you did not initiate this login, please visit ${allowedUrls[0]}/account/password/reset to reset your password.`

    const transportMail: IMailer = {
        senderName: 'Kawojue Raheem',
        to: existingUser.mail.email,
        subject: 'Login Notification',
        text
    }

    if(existingUser.mail.isVerified) {
        existingUser.deviceInfo = deviceInfo
        existingUser.refreshToken = refreshToken
        await existingUser.save()
        if (devName !== exDevName || devOs !== exDevOs || devVersion !== exDevVersion) {
            await mailer(transportMail)
        }
    }

    res.cookie("auth", refreshToken, newCookie)
    res.status(200).json({
        success: true as boolean,
        username,
        mail: existingUser.mail,
        accessToken,
        roles
    })
})
