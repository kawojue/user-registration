import * as bcrypt from 'bcrypt'
import User from '../model/userSchema'
import { Request, Response } from 'express'
import mailer, { IMailer } from '../config/mailer'
const asyncHandler = require('express-async-handler')
import generateOTP, { IGenOTP } from '../config/manageOTP'

export const handleSignup = asyncHandler(async (req: Request, res: Response) => {
    const { email, pswd, deviceInfo }: any = req.body

    const mail: string = email?.toLowerCase().trim()
    const { totpDate, totp }: IGenOTP = generateOTP()

    const existingEmail: any = await User.findOne({ 'mail.email': mail }).exec()

    if (!pswd || !mail) return res.sendStatus(400)
    if (existingEmail) return res.sendStatus(401)

    const hashedPswd: string = await bcrypt.hash(pswd, 12)
    await User.create({
        mail: {
            email: mail
        },
        password: hashedPswd,
        deviceInfo,
        manageOTP: {
            totp,
            totpDate
        }
    })

    const transportMail: IMailer = {
        senderName: "Always Appear",
        to: mail,
        subject: "Verify your Email.",
        text: `Code: ${totp}`
    }
    await mailer(transportMail)

    res.status(201).json({
        success: true,
        email: mail
    })
})