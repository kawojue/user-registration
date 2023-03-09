import express, { Router } from 'express'
import { verifyJWT } from '../../middlewares/verifyJWT'
import { handleUser, handleAllUsers } from '../../controllers/userController'

const router: Router = express.Router()

router.get('/', handleAllUsers)

router.get('/:id', verifyJWT, handleUser)

export default router