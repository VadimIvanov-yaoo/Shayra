import { makeAutoObservable } from 'mobx'
import { getChats } from '../http/userApi'

export default class ChatsStore {
  _chats = []
  _loading = []
  constructor() {
    makeAutoObservable(this)
  }

  setChats(chats) {
    this._chats = chats
  }

  get chats() {
    return this._chats
  }

  setCurrentChat(id) {
    this.currentChatId = id
  }

  get currentChat() {
    return this.chats.find((chat) => chat.id === this.currentChatId) || null
  }

  async loadChats() {
    this._loading = true
    try {
      const data = await getChats()
      this.setChats(data.chats)
    } catch (e) {
      console.error('Ошибка загрузки чатов', e)
    } finally {
      this._loading = false
    }
  }
}
