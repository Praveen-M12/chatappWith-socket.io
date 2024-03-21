const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const colors = require('colors')

app.use(express.static(__dirname + '/src'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`.bgGreen.black)
})