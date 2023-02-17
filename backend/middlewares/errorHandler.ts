import { ErrorRequestHandler, Request, Response, NextFunction} from 'express'

export default function errorHandler (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server Error.' })
}