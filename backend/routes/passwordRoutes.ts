import express, { Router } from 'express'
import { verify } from '../controllers/verifyOTPController'
import { handleResetPswd } from '../controllers/resetPswdController'
import { handleForgotPswd } from '../controllers/forgotPswdController'

const passwordRoute: Router = express.Router()

passwordRoute.post('/verify', verify)
passwordRoute.post('/reset', handleForgotPswd)
passwordRoute.post('/forgotten', handleResetPswd)

export default passwordRoute