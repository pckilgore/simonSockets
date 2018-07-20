const path = require('path');
const express = require('express');
const app = express();
const socketServer = require('socket.io');

// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen
const server = app.listen(1337, function() {
  console.log(`Listening on http://localhost:${server.address().port}`);
});

const io = socketServer(server);

io.on('connection', function(socket) {
  console.log('A new client has connected!');
  console.log(socket.id);

  socket.on('button-press', data => {
    socket.broadcast.emit('pushed', data);
  });

  socket.on('disconnect', function(whyClosed) {
    console.log(`${whyClosed}: client ${socket.id} disconnected.  :-(`);
  });
});

app.use(express.static(path.join(__dirname, '..', 'public')));
