import User from '../model/userSchema'
import { Request, Response } from 'express'
import mailer, { IMailer } from '../config/mailer'
import genOTP, { IGenOTP } from '../config/manageOTP'
const asyncHandler = require('express-async-handler')

export const handleForgotPswd = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body
    const mail: string = email?.toLowerCase().trim()

    const { totp, totpDate }: IGenOTP = genOTP()

    const exists: any = await User.findOne({ 'mail.email': mail }).exec()

    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email address.'
        })
    }

    if (!exists) {
        return res.status(401).json({
            success: false,
            message: 'Account does not exist.'
        })
    }

    exists.manageOTP.totp = totp
    exists.manageOTP.totpDate = totpDate
    await exists.save()

    const transportMail: IMailer = {
        senderName: "Always Appear",
        to: mail,
        subject: "Forgot Password",
        text: `Code: ${totp}`
    }

    await mailer(transportMail)

    res.status(200).json({
        success: true
    })
})