import { validate } from 'deep-email-validator'

export interface ICheckMail {
    valid: boolean
    validators: any
    reason?: string
}

const checkMail = async (email: string): Promise<ICheckMail> => {
    let { valid, validators } = await validate(email)
    return { valid, validators }
}

export default checkMail