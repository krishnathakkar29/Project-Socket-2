import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import { createServer } from 'http'

const app = express()
const server = createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
    console.log("Socket connected: ", socket.id)
} )

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})