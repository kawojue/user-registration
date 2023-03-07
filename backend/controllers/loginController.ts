import dotenv from 'dotenv'
import * as bcrypt from 'bcrypt'
import mailer from '../config/mailer'
import User from '../model/userSchema'
import jwt, { Secret } from 'jsonwebtoken'
const asyncHandler = require('express-async-handler')
import { CookieOptions, Request, Response } from 'express'

dotenv.config()

const clearCookies: CookieOptions = {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000
}

export const handleLogin = asyncHandler(async (req: Request, res: Response) => {
    const { user, pswd } = req.body
    const EMAIL_REGEX:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    let existingUser: any
    const isEmail = EMAIL_REGEX.test(user)
    const userId: string = user.toLowerCase().trim()

    if (isEmail) {
        existingUser = await User.findOne({ email: userId })
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
        { "userId": userId },
        `${process.env.SECRET_REFRESH_TOKEN}`,
        { expiresIn: '7d' }
    )

    const text: string = `
    Hello ${username.toUpperCase()},\n\n\n
    A successful login just occurred at .\n
    If you did not initiate this login, please visit <___> to reset your password.
    `
    await mailer(existingUser.email, 'Login Notification', text)

    existingUser.refreshToken = refreshToken
    await existingUser.save()

    res.cookie('loginCookie', refreshToken, clearCookies)
    res.json({
        success: true,
        username,
        email: existingUser.email,
        accessToken,
        roles
    })
})