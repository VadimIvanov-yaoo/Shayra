import { lazy } from 'react'
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts.js'

export const authRouts = [
  {
    path: MAIN_ROUTE,
    Component: lazy(() => import('../pages/MainPage/MainPage.jsx')),
  },
]

export const publicRouts = [
  {
    path: LOGIN_ROUTE,
    Component: lazy(() => import('../pages/LoginPage/LoginPage.jsx')),
  },

  {
    path: REGISTRATION_ROUTE,
    Component: lazy(() => import('../pages/RegisterPage/RegisterPage.jsx')),
  },

  {
    path: MAIN_ROUTE,
    Component: lazy(() => import('../pages/MainPage/MainPage.jsx')),
  },
]
