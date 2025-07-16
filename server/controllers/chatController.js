import models from '../models/models.js'
const { User, Chat } = models
import ApiError from '../error/ApiError.js'

class ChatController {
  //   async getChats(req, res, next) {
  //     try {
  //       const userId = req.user.id
  //
  //       const userWithChats = await User.findByPk(userId, {
  //         include: {
  //           model: Chat,
  //           through: { attributes: [] },
  //         },
  //       })
  //
  //       return res.json(userWithChats)
  //     } catch (e) {
  //       next(ApiError.internal('Чаты не найдены'))
  //     }
  //   }

  async searchUser(req, res, next) {
    try {
      const { userName } = req.query
      const foundUser = await User.findOne({ where: { userName } })
      return res.json(foundUser)
    } catch (e) {
      next(ApiError.internal('Пользователи не найдены'))
    }
  }
}

const chatController = new ChatController()

export default chatController
