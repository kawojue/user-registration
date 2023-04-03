import { allowedUrl } from "../config/corsOptions"
import { Request, Response, NextFunction } from "express"

const credentials = (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin
    if (allowedUrl === origin) {
        res.header('Access-Control-Allow-Credentials', origin)
    }
    next()
}

export default credentials