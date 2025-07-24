import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import userController from '../controllers/userController.js'
import chatController from '../controllers/chatController.js'

const router = Router()

router.get('/search', authMiddleware, chatController.searchUser)
router.post('/newChat', authMiddleware, chatController.createChat)
router.get('/getMessage', authMiddleware, chatController.getMessage)

export default router
