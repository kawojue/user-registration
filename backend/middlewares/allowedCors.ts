import { Request, Response, NextFunction } from 'express'

export const handleCors = (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "vercel.com");
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
}