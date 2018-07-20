import io from 'socket.io-client';
import store, { gotNewRound, buttonPush } from './store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');

  socket.on('pushed', data => {
    console.log('Got new push', data);
    store.dispatch(buttonPush(data));
  });
});

export default socket;
