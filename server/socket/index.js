import models from '../models/models.js'
import { Op } from 'sequelize'
const { Message, User, Dialog } = models

export default function initSocket(io) {
  async function getChatPartners(userId) {
    const dialogs = await Dialog.findAll({
      where: {
        type: 'dialog',
        [Op.or]: [{ creatorId: userId }, { participantId: userId }],
      },
    })

    return dialogs.map((d) =>
      d.creatorId === userId ? d.participantId : d.creatorId
    )
  }

  io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('onlineUser', async (userId) => {
      try {
        const user = await User.findByPk(userId)
        if (!user) return

        socket.userId = userId
        user.status = 'online'
        await user.save()
        console.log('user online', socket.userId)

        const partners = await getChatPartners(userId)
        partners.forEach((pid) => {
          io.emit('statusChange', { userId, status: 'online' })
        })
      } catch (e) {
        console.error('Ошибка обновления статуса онлайн:', e)
      }
    })

    socket.on('newMessage', async (data) => {
      try {
        const message = await Message.create({
          text: data.text,
          senderId: data.senderId,
          dialogId: data.dialogId,
        })
        io.emit('messageCreated', message)
      } catch (e) {
        console.log('Ошибка при отправке сообщения', e)
      }
    })

    socket.on('message', (msg) => {
      console.log('message: ' + msg)
    })

    socket.on('disconnect', async () => {
      console.log('user disconnected')
      if (socket.userId) {
        setTimeout(async () => {
          const user = await User.findByPk(socket.userId)
          if (!user) return

          user.status = 'offline'
          await user.save()
          console.log('user offline')

          const partners = await getChatPartners(socket.userId)
          partners.forEach((pid) => {
            io.emit('statusChange', {
              userId: socket.userId,
              status: 'offline',
            })
          })
        }, 10000)
        try {
        } catch (e) {
          console.error('Ошибка обновления статуса онлайн:', e)
        }
      }
    })
  })
}
