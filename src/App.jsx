import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppRouter from './components/appRouter/appRouter.js'
function App() {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  )
}

export default App
