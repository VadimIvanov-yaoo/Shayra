import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import router from './routes/index.js'
import sequelize from './db.js'
import models from './models/models.js'
const { Message } = models
import cors from 'cors'
import { createServer } from 'http'
import errorHandler from './middleware/ErrorHandingMiddleware.js'
import { Server } from 'socket.io'

const PORT = process.env.PORT || 10000
const app = express()

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

// app.use(cors())
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
)

app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('newMessage', async (data) => {
    try {
      const message = await Message.create({
        text: data.text,
        senderId: data.senderId,
        dialogId: data.dialogId,
      })
      io.emit('messageCreated', message)
    } catch (e) {
      console.log('Ошибка при отправке сообщения', e)
    }
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    console.log('message: ' + msg)
  })
})

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
