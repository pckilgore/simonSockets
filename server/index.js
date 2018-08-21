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
    console.log(socket.id, 'pushed', data);
    socket.broadcast.emit('pushed', data);
  });

  socket.on('random', (data = 20) => {
    console.log('Got request for random');
    const notes = Array(data)
      .fill('')
      .map(
        () =>
          ({ 0: 'red', 1: 'yellow', 2: 'green', 3: 'blue' }[
            Math.floor(Math.random() * 4)
          ])
      );
    console.log('Going to emit:', notes);
    socket.broadcast.emit('new-round', notes);
  });

  socket.on('disconnect', function(whyClosed) {
    console.log(`${whyClosed}: client ${socket.id} disconnected.  :-(`);
  });
});

app.use(express.static(path.join(__dirname, '..', 'public')));
