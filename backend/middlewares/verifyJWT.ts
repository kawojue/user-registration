import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'

dotenv.config()

export const verifyJWT = (req: any, res: Response, next: NextFunction) => {
    const authHeader:any = req.headers['authorization']
    if (!authHeader?.startsWith('Bearer')) return res.sendStatus(401)
    
    const token = authHeader?.split(' ')[1]
    jwt.verify(
        token,
        `${process.env.SECRET_ACCESS_TOKEN}`,
        (err: any, user:any) => {
            if (err) return res.sendStatus(403)
            req.user = user.userInfo.userId
            next()
        }
    )
}
