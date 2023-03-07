import dotenv from 'dotenv'
import nodemailer, { Transporter } from 'nodemailer'

dotenv.config()

const transporter: Transporter = nodemailer.createTransport({
    host: 'smpt.gmail.com',
    secure: false,
    service: 'gmail',
    requireTLS: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PSWD
    }
})

async function mailer(recv: string, subj: string, msg: string | string):Promise<void> {
    await transporter.sendMail({
        from: "Kawojue Raheem <tmailer08@gmail.com>",
        to: recv,
        subject: subj,
        text: msg,
        headers: {
            'Content-Type': 'application/text',
        }
    })
}

export default mailer