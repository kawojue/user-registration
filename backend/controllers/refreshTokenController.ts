import dotenv from 'dotenv'
import User from '../model/userSchema'
import jwt, { Secret } from 'jsonwebtoken'
import { Request, Response } from 'express'
const asyncHandler = require('express-async-handler')

dotenv.config()

export const handleRefreshToken = asyncHandler(async (req: Request, res: Response) => {
    const cookies = req.cookies
    if (!cookies?.loginCookie) return res.sendStatus(401) // unauthorized

    const refreshToken = cookies.loginCookies
    const existingUser = await User.findOne({ refreshToken }).exec()

    if (!existingUser) return res.sendStatus(403) // forbidden

    jwt.verify(
        refreshToken,
        `${process.env.SECRET_REFRESH_TOKEN}`,
        (err: any, decoded: any) => {
            if (err || decoded.username !== existingUser.username) return res.sendStatus(403)
            const accessToken: Secret = jwt.sign(
                { "username": decoded.username },
                `${process.env.SECRET_ACCESS_TOKEN}`,
                { expiresIn: '1h'}
            )
            res.status(200).json({ success: true, message: accessToken })
        }
    )
})