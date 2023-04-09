import { Request, NextFunction } from "express"
import { allowedUrls } from "../config/corsOptions"

const credentials = (req: Request, res: any, next: NextFunction) => {
    const origin = req.headers.origin
    if (allowedUrls.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true)
    }
    next()
}

export default credentials