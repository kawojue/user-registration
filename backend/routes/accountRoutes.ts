import express, { Router } from 'express'
import { verify } from '../controllers/verifyOTPController'
import { handleResetPswd } from '../controllers/resetPswdController'
import { handleForgotPswd } from '../controllers/forgotPswdController'

const accountRoute: Router = express.Router()

accountRoute.post('/verify', verify)
accountRoute.post('/reset', handleForgotPswd)
accountRoute.post('/passwordreset', handleResetPswd)

export default accountRoute