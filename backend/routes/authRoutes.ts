import express, { Router } from 'express'
import { handleLogin } from '../controllers/loginController'
import { handleLogout } from '../controllers/logoutController'
import { handleSignup } from '../controllers/signupController'

const authRoute: Router = express.Router()

authRoute.post('/login', handleLogin)
authRoute.get('/logout', handleLogout)
authRoute.post('/signup', handleSignup)

export default authRoute