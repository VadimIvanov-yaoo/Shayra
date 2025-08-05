import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: path.resolve(__dirname, 'client'),
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    allowedHosts: 'all',
    historyApiFallback: true,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        // target: 'http://localhost:5000',
        target: 'https://shayra-backend.onrender.com',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
    },
  },
})
