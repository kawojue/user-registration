import express, { Router } from 'express'
import { handleUser } from '../../controllers/userController'

const router: Router = express.Router()

router.get('/:id', handleUser)

export default router