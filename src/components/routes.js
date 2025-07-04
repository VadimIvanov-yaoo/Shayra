import MainPage from '../pages/MainPage/MainPage.jsx'
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts.js'
import LoginPage from '../pages/LoginPage/LoginPage.jsx'
import RegisterPage from '../pages/RegisterPage/RegisterPage.jsx'

export const authRouts = [
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
]

export const publicRouts = [
  {
    path: LOGIN_ROUTE,
    Component: LoginPage,
  },

  {
    path: REGISTRATION_ROUTE,
    Component: RegisterPage,
  },
]
