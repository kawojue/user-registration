import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

dotenv.config()

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader:any = req.headers['authorization']
    if (!authHeader?.startsWith('Bearer')) return res.sendStatus(401)
    
    const token = authHeader?.split(' ')[1]
    jwt.verify(
        token,
        `${process.env.SECRET_ACCESS_TOKEN}`,
        (err: any, user:any) => {
            if (err) return res.sendStatus(403)
            console.log(user)
            // console.log(req)
            // req.user = user.userId
            req.body.user = user.userId
            next()
        }
    )
}
