import express, { Router } from 'express'
import limiter from '../middlewares/limiter'
import { handleLogin } from '../controllers/login'
import { handleLogout } from '../controllers/logout'
import { handleSignup } from '../controllers/signup'
import { handleRefreshToken } from '../controllers/refreshToken'

const authRoute: Router = express.Router()

authRoute.get('/logout', handleLogout)
authRoute.post('/signup', handleSignup)
authRoute.get('/refresh', handleRefreshToken)
authRoute.post('/login', limiter, handleLogin)

export default authRoute