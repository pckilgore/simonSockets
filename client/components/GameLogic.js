import React from 'react';
import { connect } from 'react-redux';
import { sendPress, playedRemote } from '../store';

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

  playNext() {
    if (this.currentAudio) {
      // remove the event listener from the audio that has just stopped playing
      this.currentAudio.removeEventListener('ended', this.playNext);
    }
    if (this.playIndex >= this.props.playlist.length) {
      this.playIndex = 0;
      this.currentAudio = null;
      this.props.playedRemote();
      return;
    }
    let color = this.props.playlist[this.playIndex++];
    this.currentAudio = this.state.players[color];
    this.currentAudio.play(); // when this ends, the 'ended' event will be fired and 'playNext' will be called
    this.currentAudio.addEventListener('ended', this.playNext);
  }

  emitPush = color => {
    this.state.players[color].play();
    this.props.sendPress(color);
  };

  componentDidUpdate() {
    if (this.props.playlist.length) {
      this.playNext();
    }
  }

  render() {
    return <GameBoard emitPush={this.emitPush} pushed={} />;
  }
}

const mapDispatchToProps = dispatch => ({
  sendPress: color => dispatch(sendPress(color)),
  playedRemote: () => dispatch(playedRemote()),
});

const mapStateToProps = state => ({
  playlist: state.playlist,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameLogic);
