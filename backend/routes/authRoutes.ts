import express, { Router } from 'express'
import { handleLogin } from '../controllers/loginController'
import { handleLogout } from '../controllers/logoutController'
import { handleSignup } from '../controllers/signupController'
import { handleForgotPswd } from '../controllers/forgotPswdController'
import { handleRefreshToken } from '../controllers/refreshTokenController'

const authRoute: Router = express.Router()

authRoute.post('/login', handleLogin)
authRoute.get('/logout', handleLogout)
authRoute.post('/signup', handleSignup)
authRoute.get('/refresh', handleRefreshToken)
authRoute.post('/forgotten', handleForgotPswd)

export default authRoute