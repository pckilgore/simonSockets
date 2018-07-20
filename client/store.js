import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import socket from './socket';

//action types
const GOT_NEW_ROUND = 'GOT_NEW_ROUND';
const BUTTON_PUSH = 'BUTTON_PUSH';
const PLAY_DONE = 'PLAY_DONE';

//action creators
export const gotNewRound = round => {
  return {
    type: GOT_NEW_ROUND,
    round,
  };
};

export const playDone = () => ({
  type: PLAY_DONE,
});

export const buttonPush = color => ({
  type: BUTTON_PUSH,
  color,
});

export const sendPress = color => dispatch => {
  socket.emit('button-press', color);
};

export const sendRand = () => dispatch => {
  socket.emit('random', 20);
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
    case BUTTON_PUSH:
      if (state.playlist.length)
        return {
          ...state,
          playQueue: [...state.playQueue, action.color],
        };
      else
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
