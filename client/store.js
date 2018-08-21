import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import socket from './socket';

//action types
const GOT_NEW_ROUND = 'GOT_NEW_ROUND';
const BUTTON_PRESS_PLAY = 'BUTTON_PRESS_PLAY';
const BUTTON_PRESS_QUEUE = 'BUTTON_PRESS_QUEUE';
const PLAY_DONE = 'PLAY_DONE';

//action creators
export const playNewRound = round => {
  return {
    type: GOT_NEW_ROUND,
    round,
  };
};

export const playDone = () => ({
  type: PLAY_DONE,
});

const addPressToQueue = color => ({
  type: BUTTON_PRESS_QUEUE,
  color,
});

const addPressToPlaylist = color => ({
  type: BUTTON_PRESS_PLAY,
  color,
});

export const sendPress = color => dispatch => {
  socket.emit('button-press', color);
};

export const sendRand = () => dispatch => {
  socket.emit('random', 20);
};

export const buttonPush = color => (dispatch, getState) => {
  const { playlist } = getState();
  if (playlist.length) dispatch(addPressToQueue(color));
  else dispatch(addPressToPlaylist(color));
};

export const gotNewRound = round => (dispatch, getState) => {
  const { playlist, playQueue } = getState();
  if (playlist.length + playQueue.length === 0) dispatch(playNewRound(round));
  else {
    console.log('Error: Received new round while already playing notes.');
    console.log('Event swallowed.');
  }
};

//initial state
const initialState = {
  playlist: [],
  playQueue: [],
};

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY_DONE:
      return {
        playlist: [...state.playQueue],
        playQueue: [],
      };
    case BUTTON_PRESS_QUEUE:
      return {
        ...state,
        playQueue: [...state.playQueue, action.color],
      };
    case BUTTON_PRESS_PLAY:
      return {
        ...state,
        playlist: [action.color],
      };
    case GOT_NEW_ROUND:
      return {
        ...state,
        playlist: action.round,
      };
    default:
      return state;
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
