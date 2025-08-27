import models from '../models/models.js'
const { User, Chat, ChatMember, Dialog, DialogMember, Message } = models
import ApiError from '../error/ApiError.js'
import bcrypt from 'bcrypt'
import sequelize from '../db.js'
import { Model as Partner, Model, Op } from 'sequelize'

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

  async createChat(req, res, next) {
    try {
      const { userId1, userId2 } = req.body

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
      console.error('Ошибка на сервере при создании чата:', error)
      return res
        .status(500)
        .json({ message: 'Внутренняя ошибка сервера', error: error.message })
    }
  }

  async getChats(req, res, next) {
    try {
      const userId = req.user.id

      const dialogs = await Dialog.findAll({
        where: {
          type: 'dialog',
          [Op.or]: [{ creatorId: userId }, { participantId: userId }],
        },
      })

      return res.json(dialogs)
    } catch (e) {
      next(ApiError.internal('Чаты не найдены'))
    }
  }

  async getMessage(req, res, next) {
    try {
      const { dialogId } = req.query
      const foundMessage = await Message.findAll({ where: { dialogId } })
      return res.json(foundMessage)
    } catch (e) {
      next(ApiError.internal('Сообщения не найдены'))
    }
  }

  async getPartnerInfo(req, res, next) {
    try {
      const { id } = req.query
      const foundPartner = await User.findOne({
        where: { id },
        attributes: ['id', 'userName', 'avatarUrl', 'status'],
      })
      return res.json(foundPartner)
    } catch (e) {
      next(ApiError.internal('Данные собеседника не найдены'))
      console.log(e)
    }
  }

  async getLastedChatMessage(req, res, next) {
    try {
      let { chatIds } = req.body
      if (!Array.isArray(chatIds)) {
        chatIds = [chatIds]
      }
      const lastMessages = await Promise.all(
        chatIds.map(async (chatId) => {
          return await Message.findOne({
            where: { dialogId: chatId },
            order: [['timestamp', 'DESC']],
          })
        })
      )
      res.json(lastMessages)
    } catch (e) {
      next(ApiError.internal('Последние сообщения не найдены'))
      console.error(e)
    }
  }
}

const chatController = new ChatController()

export default chatController
