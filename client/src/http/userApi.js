import { $host, $authHost } from './index.js'
import { jwtDecode } from 'jwt-decode'

let date = new Date()

export const registration = async (email, password) => {
  const { data } = await $host.post('api/user/registration', {
    email,
    password,
  })
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token)
}

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', {
    email,
    password,
  })
  localStorage.setItem('token', data.token)
  if (!document.cookie) document.cookie = `visitedDate=${date}, path=/`
  return jwtDecode(data.token)
}
export const check = async () => {
  const { data } = await $authHost.get('api/user/auth')
  return data
}

export const updateProfile = async (userName) => {
  const { data } = await $authHost.put('api/user/profile', { userName })
  return data
}

export const getChats = async () => {
  const { data } = await $authHost.get('api/chat/getChats')
  return data
}

export const searchUser = async (userName) => {
  const { data } = await $authHost.get('api/chat/search', {
    params: { userName },
  })
  return data
}

export const createChat = async (userId1, userId2) => {
  const { data } = await $authHost.post('api/chat/newChat', {
    userId1,
    userId2,
  })
  return data
}

export const getMessage = async (dialogId) => {
  const { data } = await $authHost.get('api/chat/getMessage', {
    params: { dialogId },
  })
  return data
}

export const getPartnerInfo = async (id) => {
  const { data } = await $authHost.get('api/chat/partner', {
    params: { id },
  })
  console.log('Данные пришли ', id)
  return data
}
