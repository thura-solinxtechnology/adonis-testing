import Ws from 'App/Services/Ws'

Ws.boot()

Ws.io.on('connection', (socket) => {
  const existingSocket = Ws.activeSockets.find((existingSocket) => existingSocket === socket.id)

  if (!existingSocket) {
    Ws.activeSockets.push(socket.id)

    socket.emit('users:update-list', {
      users: Ws.activeSockets.filter((existingSocket) => existingSocket !== socket.id),
    })

    socket.broadcast.emit('users:update-list', { users: [socket.id] })
  }

  socket.on('message:send', (data) => {
    socket.broadcast.emit('message:send', data)
  })
})
