export function generateOTP() {
    let OTP = ''
    const length = 6
    const digits = '0123456789'
    for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * length)]
    }

    return OTP
}