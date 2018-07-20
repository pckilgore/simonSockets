import React from 'react';

const SimonButton = props => (
  <div className=" col s6">
    <a
      id={`${props.color}_button`}
      style={{ display: 'block', height: '40vh' }}
      className={`btn ${props.color} darken-2 waves-effect waves-light card`}
      onClick={() => props.emitPush(props.color)}
    />
  </div>
);

export default SimonButton;
