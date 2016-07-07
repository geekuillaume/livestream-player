import React, { PropTypes } from 'react';

import styles from '../styles.css';

import PlayIcon from '../assets/play-icon.svg';
import PauseIcon from '../assets/pause-icon.svg';

export class VideoControls extends React.Component {

  static propTypes = {
    video: PropTypes.object,
    hls: PropTypes.object,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.video !== nextProps.video && nextProps.video) {
      nextProps.video.addEventListener('progress', () => this.forceUpdate());
      nextProps.video.addEventListener('pause', () => this.forceUpdate());
      nextProps.video.addEventListener('play', () => this.forceUpdate());
    }
  }

  changeLevel = (level) => {
    this.props.hls.nextLevel = level;
  }

  togglePause = () => {
    if (this.props.video.paused) {
      this.props.video.play();
    } else {
      this.props.video.pause();
    }
  }


  render() {
    if (!this.props.hls) {
      return false;
    }

    // If we don't have the levels yet, don't show anything
    const levels = (this.props.hls.levels || []).map((level, i) => (
      <button className={styles.level} onClick={() => this.changeLevel(i)} key={i}>{level.width} x {level.height}</button>
    ));

    // Choosing the right icon depending on the state of the video
    const PlayPauseIcon = this.props.video.paused ? PlayIcon : PauseIcon;

    return (
      <div className={styles.videoControls}>
        <div className={styles.playPauseContainer}>
          <PlayPauseIcon className={styles.controlsButton} onClick={this.togglePause} />
        </div>
        <div className={styles.levels}>
          <button className={styles.level} onClick={() => this.changeLevel(-1)}>Auto</button>
          {levels}
        </div>
      </div>
    );
  }
}
