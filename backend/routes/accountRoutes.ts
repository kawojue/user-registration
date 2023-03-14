import express, { Router } from 'express'
import passwordRoute from './passwordRoutes'

const accountRoute: Router = express.Router()

accountRoute.use('/password', passwordRoute)

export default accountRoute