import dotenv from 'dotenv'
import * as bcrypt from 'bcrypt'
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
    const username: string = user.toLowerCase()

    const existingUser: any = await User.findOne({ username }).exec()

    if (!user || !pswd || !existingUser) {
        return res.status(400).json({
            success: false,
            message: "Invalid username or password."
        })
    }

    const checkPswd = await bcrypt.compare(pswd, existingUser.password)

    if (!checkPswd) {
        return res.status(401).json({
            success: false,
            message: "Incorrect password."
        })
    }

    const roles = Object.values(existingUser.roles)
    const accessToken: Secret = jwt.sign(
        {
            "userInfo": {
                "username": existingUser.username,
                "roles": roles
            }
        },
        `${process.env.SECRET_ACCESS_TOKEN}`,
        { expiresIn: '1h' }
    )
    const refreshToken: Secret = jwt.sign(
        { "username": user },
        `${process.env.SECRET_REFRESH_TOKEN}`,
        { expiresIn: '7d' }
    )

    existingUser.refreshToken = refreshToken
    await existingUser.save()

    res.cookie('loginCookie', refreshToken, clearCookies)
    res.status(200).json({
        success: true,
        accessToken,
        roles
    })
})