import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import router from './routes/index.js'
import sequelize from './db.js'
import models from './models/models.js'
import cors from 'cors'
import errorHandler from './middleware/ErrorHandingMiddleware.js'

const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)
const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
