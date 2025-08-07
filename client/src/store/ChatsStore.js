import { makeAutoObservable } from 'mobx'
import { getChats } from '../http/userApi'

export default class ChatsStore {
  _chats = []
  _loading = false
  selectedChatId = null

  constructor() {
    makeAutoObservable(this)
  }

  setChats(chats) {
    this._chats = chats
  }

  addChat(chat) {
    const exists = this._chats.some((c) => c.id === chat.id)
    if (!exists) {
      this._chats.push(chat)
    }
  }

  setCurrentChat(id) {
    this.selectedChatId = id
  }

  get chats() {
    return this._chats
  }

  get currentChat() {
    return this.chats.find((c) => c.id === this.selectedChatId) || null
  }

  async loadChats() {
    this._loading = true
    try {
      const data = await getChats()
      this.setChats(data)
      console.log('data ', data)
    } catch (e) {
      console.error('Ошибка загрузки чатов', e)
    } finally {
      this._loading = false
    }
  }
}
