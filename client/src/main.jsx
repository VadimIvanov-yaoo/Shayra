import React, { createContext } from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserStore from './store/UserStore'

export const Context = createContext(null)

console.log(import.meta.env.VITE_API_URL)

createRoot(document.getElementById('root')).render(
  <Context.Provider value={{ user: new UserStore() }}>
    <StrictMode>
      <App />
    </StrictMode>
  </Context.Provider>
)
