import { useContext } from 'react'
import { createChat } from '../../http/userApi'
import { Context } from '../../main'

export function useCreateChat() {
  const { chat, user } = useContext(Context)

  async function createNewChat(userId2) {
    try {
      const dialog = await createChat(user.user.id, userId2)

      const exists = chat.chats.some((n) => n.id === dialog.id)

      if (!exists) {
        chat.chats.push(dialog)
        console.log('Успешно создан')
      } else {
        console.log('Чат уже существует')
      }
    } catch (error) {
      console.error('Ошибка создании чата', error)
    }
  }

  return createNewChat
}
