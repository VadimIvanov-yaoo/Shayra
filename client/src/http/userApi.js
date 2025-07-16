import { $host, $authHost } from './index.js'
import { jwtDecode } from 'jwt-decode'

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

export const checkOnline = async (payload) => {
  const { data } = await $authHost.put('api/user/online', payload)
  return data
}

export const getChats = async () => {
  const { data } = await $authHost.get('api/user/getChats')
  return data
}

export const searchUser = async (userName) => {
  const { data } = await $authHost.get('api/chat/search', {
    params: { userName },
  })
  return data
}
