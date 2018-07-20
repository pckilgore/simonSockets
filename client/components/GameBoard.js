import React from 'react';
import SimonButton from './SimonButton';

const GameBoard = props => (
  <div className="container" style={{ overflow: 'hidden' }}>
    <button className="btn" type="button" onClick={props.newRand}>
      Emit Random{' '}
    </button>
    <div className="row">
      {['green', 'red', 'yellow', 'blue'].map(color => (
        <SimonButton key={color} color={color} emitPush={props.emitPush} />
      ))}
    </div>
  </div>
);

export default GameBoard;
