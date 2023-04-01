import { Request, Response, NextFunction } from 'express'
import rateLimit, { RateLimitRequestHandler, Options } from 'express-rate-limit'

const timerArr: number[] = [61, 69, 78, 89, 99]

const limiter: RateLimitRequestHandler = rateLimit({
    windowMs: timerArr[Math.floor(Math.random() * timerArr.length)] * 1000, // random sec to try again
    max: 5, // max attempt
    message: {
        message: 'Too many attempts. Please, try again later.'
    },
    handler: (req: Request, res: Response, next: NextFunction, options: Options) => {
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true,
    legacyHeaders: false,
})

export default limiter