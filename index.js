
const express = require('express')
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT
const app = express()
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Adjust the origin as needed
      } 
});


app.use(cors({
    origin: '*'
}))


io.on('connection', (socket) => {
    console.log(socket.id + ' connected')
    io.emit('message-response', socket.id + ' connected')

    socket.on('message', message => {
        io.emit('message-response', message)
    })
})



app.get('/', (req, res) => {
  res.send('server is running fine')
})

app.get('/redirect', (req, res)=>{
    res.redirect(process.env.FRONTEND_LINK)
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})