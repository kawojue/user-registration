import express, { Router } from 'express'
import limiter from '../middlewares/limiter'
import { verify } from '../controllers/verifyOTP'
import { handleResetPswd } from '../controllers/resetPswd'
import { handleForgotPswd } from '../controllers/forgotPswd'

const passwordRoute: Router = express.Router()

passwordRoute.post('/verify', limiter, verify)
passwordRoute.post('/forgotten', handleResetPswd)
passwordRoute.post('/reset', limiter, handleForgotPswd)

export default passwordRoute