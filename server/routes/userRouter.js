import { Router } from 'express'
import userController from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'
const router = Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.put('/profile', authMiddleware, userController.updateProfile)
router.get('/getChats', authMiddleware, userController.getChats)
router.put('/online', authMiddleware, userController.checkOnline)

export default router
