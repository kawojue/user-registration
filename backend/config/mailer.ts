import dotenv from 'dotenv'
import nodemailer, { Transporter } from 'nodemailer'

dotenv.config()

export interface IMailer {
    senderName: string
    to: string
    subject: string
    text: string
}

const transporter: Transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    service: 'gmail',
    requireTLS: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PSWD
    }
})

export default async function mailer({ senderName, to, subject, text }: IMailer):Promise<void> {
    await transporter.sendMail({
        from: `${senderName} <${process.env.EMAIL}>`,
        to,
        subject,
        text,
        headers: {
            'Content-Type': 'application/text',
        }
    })
}