import { Router } from 'express'

const router = Router()

router.post('/chats', (req, res) => {
  // логика создания чата
  res.json({ message: 'Chat created' })
})

router.get('/chats', (req, res) => {
  // логика получения всех чатов пользователя
  res.json({ chats: [] })
})

router.get('/chats/:chatId', (req, res) => {
  // логика получения чата по id
  res.json({ chatId: req.params.chatId })
})

router.post('/chats/:chatId/members', (req, res) => {
  // добавить участника в чат
  res.json({ message: 'Member added' })
})

router.delete('/chats/:chatId/members/:userId', (req, res) => {
  // удалить участника из чата
  res.json({ message: 'Member removed' })
})

router.delete('/chats/:chatId', (req, res) => {
  // удалить чат
  res.json({ message: 'Chat deleted' })
})

export default router
