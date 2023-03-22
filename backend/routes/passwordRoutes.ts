import express, { Router } from 'express'
import limiter from '../middlewares/limiter'
import { verify } from '../controllers/verifyOTPController'
import { handleResetPswd } from '../controllers/resetPswdController'
import { handleForgotPswd } from '../controllers/forgotPswdController'

const passwordRoute: Router = express.Router()

passwordRoute.post('/reset', handleForgotPswd)
passwordRoute.post('/verify', limiter, verify)
passwordRoute.post('/forgotten', handleResetPswd)

export default passwordRoute