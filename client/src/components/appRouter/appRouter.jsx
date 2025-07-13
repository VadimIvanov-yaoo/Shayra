import React, { Suspense, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { authRouts, publicRouts } from '../routes.js'
import { Context } from '../../main'

const AppRouter = () => {
  const isAuth = false
  const { user } = useContext(Context)

  console.log(user)
  return (
    <Routes>
      {user.isAuth &&
        authRouts.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

      {!user.isAuth &&
        publicRouts.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      <Route path="*" element={<div>404 — Страница не найдена</div>} />
    </Routes>
  )
}

export default AppRouter
