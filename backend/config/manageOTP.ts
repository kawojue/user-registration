export interface IGenOTP {
    OTP: string
    now: number
}

export function generateOTP(): IGenOTP {
    let OTP: string = ''
    const now: number = Date.now()
    const digits: string = '0123456789'
    const length: number = parseInt('65'[Math.floor(Math.random() * 2)])
    for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * length)]
    }

    return { OTP, now }
}