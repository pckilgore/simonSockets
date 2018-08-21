import React from 'react';
import { connect } from 'react-redux';
import { sendPress, playDone, sendRand } from '../store';

import GameBoard from './GameBoard.js';

class GameLogic extends React.Component {
  emitPush = color => {
    if (this.props.playlist.length === 0) {
      let player = new Audio(`/media/${color}.mp3`);
      this.props.sendPress(color);
      player.play();
    }
  };

  requestRand = () => {
    this.props.sendRand();
  };

  playNotes(playlist) {
    let [color, ...rest] = playlist;

    console.log('Playing:', color, '---rest:', rest);

    let player = new Audio(`/media/${color}.mp3`);

    Waves.ripple(`#${color}_button`);
    player.addEventListener('ended', Waves.calm(`#${color}_button`));

    player.play();
    player.addEventListener('ended', () => {
      if (rest.length) this.playNotes(rest);
      else this.props.playDone();
    });

  }

  componentDidUpdate() {
    // Finn
    if (this.props.playlist.length) {
      this.playNotes(this.props.playlist);
    }
  }

  render() {
    return <GameBoard emitPush={this.emitPush} newRand={this.requestRand} />;
  }
}

const mapDispatchToProps = dispatch => ({
  sendPress: color => dispatch(sendPress(color)),
  playDone: () => dispatch(playDone()),
  sendRand: () => dispatch(sendRand()),
});

const mapStateToProps = state => ({
  playlist: state.playlist,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameLogic);
