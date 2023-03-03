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
    if (!user || !pswd) return res.sendStatus(400) // bad request
    const existingUser = await User.findOne({ username: user }).exec()
    if (!existingUser) return res.sendStatus(409) // user does not exist - conflict

    const checkPswd = await bcrypt.compare(pswd, existingUser.password)
    if (!checkPswd) return res.sendStatus(401) // incorrect password - unauthorized
    const accessToken: Secret = jwt.sign(
        { "username": user },
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
    return res.status(200).json({
        success: true,
        message: accessToken
    })
})