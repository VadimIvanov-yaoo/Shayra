import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { authRouts, publicRouts } from '../routes.js'

const AppRouter = () => {
  const isAuth = false

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        {isAuth &&
          authRouts.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}

        {!isAuth &&
          publicRouts.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        <Route path="*" element={<div>404 — Страница не найдена</div>} />
      </Routes>
    </Suspense>
  )
}

export default AppRouter
