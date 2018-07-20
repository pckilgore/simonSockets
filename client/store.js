import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import socket from './socket';

//action types
const GOT_NEW_ROUND = 'GOT_NEW_ROUND';
const BUTTON_PUSH = 'BUTTON_PUSH';
const PLAYED_REMOTE = 'PLAYED_REMOTE';

//action creators
export const gotNewRound = round => {
  return {
    type: GOT_NEW_ROUND,
    round,
  };
};

export const buttonPush = color => ({
  type: BUTTON_PUSH,
  color,
});

export const playedRemote = () => ({
  type: PLAYED_REMOTE,
});

export const sendPress = color => async dispatch => {
  socket.emit('button-press', color);
};

//initial state
const initialState = {
  round: 0,
  playlist: [],
};

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUTTON_PUSH:
      return {
        ...state,
        playlist: [...state.playlist, action.color],
      };
    case PLAYED_REMOTE:
      return {
        ...state,
        playlist: [],
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
