import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    primary: '#07c',
    secondary: '#05a',
    muted: '#f6f6f6',
  },
  space: [0, 4, 8, 16, 32, 64],
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'Georgia, serif',
  },
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
)
