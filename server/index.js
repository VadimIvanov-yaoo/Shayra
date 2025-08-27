import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import router from './routes/index.js'
import sequelize from './db.js'
import cors from 'cors'
import { createServer } from 'http'
import errorHandler from './middleware/ErrorHandingMiddleware.js'
import { Server } from 'socket.io'
import initSocket from './socket/index.js'

const PORT = process.env.PORT || 10000
const app = express()

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:5173',
      'https://shayra.vercel.app',
      'https://shayra-vadimivanov-yaoos-projects.vercel.app',
      'https://shayra-qxxv9vnoj-vadimivanov-yaoos-projects.vercel.app',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://shayra.vercel.app',
      'https://shayra-vadimivanov-yaoos-projects.vercel.app',
      'https://shayra-qxxv9vnoj-vadimivanov-yaoos-projects.vercel.app',
    ],
    credentials: true,
  })
)

app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

initSocket(io)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    server.listen(PORT, '0.0.0.0', () =>
      console.log(`Server started on port ${PORT}`)
    )
  } catch (e) {
    console.log(e)
  }
}

start()
