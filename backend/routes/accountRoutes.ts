import express, { Router } from 'express'
import { verify } from '../controllers/verifyOTPController'
import { handleChangePswd } from '../controllers/changePswdController'

const router: Router = express.Router()

router.post('/reset', verify)
router.post('/passwordreset', handleChangePswd)

export default router