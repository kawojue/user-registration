import express, { Router } from 'express'
import { verifyJWT } from '../../middlewares/verifyJWT'
import { handleUser, handleAllUsers } from '../../controllers/user'

const router: Router = express.Router()

router.get('/all/users', handleAllUsers)

router.get('/user/:id', verifyJWT, handleUser)

export default router