import { io } from 'socket.io-client'

const socket = io('http://localhost:5000')
// const socket = io('https://shayra-backend.onrender.com')

export default socket
