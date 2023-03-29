import express, { Router } from 'express'
import passwordRoute from './passwordRoutes'
import { handleAccountSetup } from '../controllers/accountSetup'

const accountRoute: Router = express.Router()

accountRoute.use('/password', passwordRoute)

accountRoute.post('/setup', handleAccountSetup)

export default accountRoute