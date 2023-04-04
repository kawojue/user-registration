import express, { Router } from 'express'
import limiter from '../middlewares/limiter'
import passwordRoute from './passwordRoutes'
import { handleReqOTP } from '../controllers/req-otp'
import { handleAccountSetup } from '../controllers/accountSetup'

const accountRoute: Router = express.Router()

accountRoute.use('/password', passwordRoute)

accountRoute.post('/req-otp', handleReqOTP)
accountRoute.post('/setup', limiter, handleAccountSetup)

export default accountRoute