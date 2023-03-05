import User from '../model/userSchema'
import { Request, Response } from 'express'
const asyncHandler = require('express-async-handler')

export const handleUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await User.findOne({ username: id }).select('-password').exec()

    if (!user) {
        return res.status(404).json({
            success: false
        })
    }
    res.status(200).json({
        success: true,
        user
    })
})