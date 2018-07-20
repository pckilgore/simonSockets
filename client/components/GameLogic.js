import React from 'react';
import { connect } from 'react-redux';
import { sendPress, playedRemote, playedNote } from '../store';

import GameBoard from './GameBoard.js';

class GameLogic extends React.Component {
  constructor() {
    super();
    this.state = {
      players: ['red', 'blue', 'green', 'yellow'].reduce((acc, color) => {
        acc[color] = new Audio(`/media/${color}.mp3`);
        return acc;
      }, {}),
    };
    this.currentAudio = null;
    this.playIndex = 0;
    this.playNext = this.playNext.bind(this);
  }

  emitPush = color => {
    this.state.players[color].play();
    this.props.sendPress(color);
  };

  componentDidUpdate() {
    if (this.props.playlist.length) {
      let color = this.props.playlist[0];
      let player = this.state.players[color];
      player.addEventListener('ended', this.props.playNextNote);
      player.play();
    }
  }

  render() {
    return <GameBoard emitPush={this.emitPush} />;
  }
}

const mapDispatchToProps = dispatch => ({
  sendPress: color => dispatch(sendPress(color)),
  playedRemote: () => dispatch(playedRemote()),
  playNextNote: () => dispatch(playedNote()),
});

const mapStateToProps = state => ({
  playlist: state.playlist,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameLogic);
