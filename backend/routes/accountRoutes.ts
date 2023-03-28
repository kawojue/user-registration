import express, { Router } from 'express'
import passwordRoute from './passwordRoutes'
import handleAccountSetup from '../controllers/accountSetup'
import handleAccountVerification from '../controllers/accountVerify'

const accountRoute: Router = express.Router()

accountRoute.use('/password', passwordRoute)

accountRoute.post('/setup', handleAccountSetup)
accountRoute.post('/verify', handleAccountVerification)

export default accountRoute