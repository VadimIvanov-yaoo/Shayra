import { makeAutoObservable } from 'mobx'
import { getMessage } from '../http/userApi'

export default class MessageStore {
  messages = []

  constructor() {
    makeAutoObservable(this)
  }

  setMessages(messages) {
    this.messages = messages
  }

  addMessage(message) {
    this.messages.push(message)
  }

  clearMessages() {
    this.messages = []
  }

  async loadMessages(dialogId) {
    if (!dialogId) return
    try {
      const messages = await getMessage(dialogId)
      // console.log('сообщения получены', messages)
      this.setMessages(messages)
    } catch (e) {
      console.error('Ошибка при получении сообщений', e)
    }
  }
}
