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

// export const check = async () => {
//   const { data } = await $authHost.post('api/user/auth')
//   localStorage.setItem('token', data.token)
//   return jwtDecode(data.token)
// }

export const check = async () => {
  const { data } = await $authHost.get('api/user/auth')
  return data
}

export const updateProfile = async (userName) => {
  const { data } = await $authHost.put('api/user/profile', { userName })
  return data
}
