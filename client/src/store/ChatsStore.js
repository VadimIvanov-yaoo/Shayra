import { makeAutoObservable } from 'mobx'
import { getChats } from '../http/userApi'

export default class ChatsStore {
  _chats = []
  _loading = false
  currentChatId = null

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
    this.currentChatId = id
  }

  get chats() {
    return this._chats
  }

  get currentChat() {
    return this._chats.find((chat) => chat.id === this.currentChatId) || null
  }

  async loadChats() {
    this._loading = true
    try {
      const data = await getChats()
      console.log('👉 Chats from API:', data)
      this.setChats(data)
    } catch (e) {
      console.error('Ошибка загрузки чатов', e)
    } finally {
      this._loading = false
    }
  }
}
