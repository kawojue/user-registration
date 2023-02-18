import express from 'express'
import { handleSignup } from '../controllers/signupController'

const router = express.Router()

router.post('/signup', handleSignup)

export default router