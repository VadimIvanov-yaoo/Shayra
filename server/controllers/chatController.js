import models from '../models/models.js'
const { User, Chat, ChatMember, Dialog, DialogMember } = models
import ApiError from '../error/ApiError.js'
import bcrypt from 'bcrypt'
import sequelize from '../db.js'
import { Model, Op } from 'sequelize'

class ChatController {
  async searchUser(req, res, next) {
    try {
      const { userName } = req.query
      const foundUser = await User.findOne({ where: { userName } })
      return res.json(foundUser)
    } catch (e) {
      next(ApiError.internal('Пользователи не найдены'))
    }
  }

  //   async createChat(req, res, next) {
  //     const { userId1, userId2 } = req.body
  //     console.log('Данные пришли: ' + userId1 + ' ' + userId2)
  //     const sortedIds = [userId1, userId2].sort((a, b) => a - b)
  //
  //     const existingDialog = await Chat.findOne({
  //       where: { type: 'dialog' },
  //       include: [
  //         {
  //           model: User,
  //           through: { attributes: [] },
  //           where: { id: sortedIds },
  //         },
  //       ],
  //       group: ['Chat.id'],
  //       having: models.sequelize.literal(`COUNT("users"."id") = 2`),
  //     })
  //
  //     if (existingDialog) {
  //       return res.json(existingDialog)
  //     }
  //
  //     const newChat = await Chat.create({ type: 'dialog' })
  //
  //     await ChatMember.bulkCreate([
  //       { chatId: newChat.id, userId: sortedIds[0] },
  //       { chatId: newChat.id, userId: sortedIds[1] },
  //     ])
  //     return res.json(newChat)
  //   }
  // }

  async createChat(req, res, next) {
    try {
      const { userId1, userId2 } = req.body
      console.log('Данные пришли:', userId1, userId2)

      if (!userId1 || !userId2) {
        return res.status(400).json({ message: 'Оба userId обязательны' })
      }

      const existingDialog = await Dialog.findOne({
        where: {
          type: 'dialog',
          [Op.or]: [
            { creatorId: userId1, participantId: userId2 },
            { creatorId: userId2, participantId: userId1 },
          ],
        },
      })

      if (existingDialog) {
        console.log('Чат уже существует')
        return res.json(existingDialog)
      }

      const creatorUser = await User.findByPk(userId1)
      const participantUser = await User.findByPk(userId2)

      if (!creatorUser || !participantUser) {
        return res.status(404).json({ message: 'Пользователь не найден' })
      }

      const newDialog = await Dialog.create({
        type: 'dialog',
        creatorId: userId1,
        participantId: userId2,
        creatorName: creatorUser.userName,
        participantName: participantUser.userName,
      })

      await DialogMember.bulkCreate([
        { dialogId: newDialog.id, userId: userId1 },
        { dialogId: newDialog.id, userId: userId2 },
      ])

      return res.json(newDialog)
    } catch (error) {
      console.error('💥 Ошибка на сервере при создании чата:', error)
      return res
        .status(500)
        .json({ message: 'Внутренняя ошибка сервера', error: error.message })
    }
  }
}

const chatController = new ChatController()

export default chatController
