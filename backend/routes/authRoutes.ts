import express, { Router } from 'express'
import loginLimiter from '../middlewares/limiter'
import { handleLogin } from '../controllers/loginController'
import { handleLogout } from '../controllers/logoutController'
import { handleSignup } from '../controllers/signupController'
import { handleRefreshToken } from '../controllers/refreshTokenController'

const authRoute: Router = express.Router()

authRoute.get('/logout', handleLogout)
authRoute.post('/signup', handleSignup)
authRoute.get('/refresh', handleRefreshToken)
authRoute.post('/login', loginLimiter, handleLogin)

export default authRoute