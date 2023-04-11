import { validate } from 'deep-email-validator'

const checkMail = async (email: string): Promise<any> => {
    let response = await validate(email)
    return response
}

export default checkMail