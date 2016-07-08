import React, { PropTypes } from 'react';

import styles from '../styles.css';

import PlayIcon from '../assets/play-icon.svg';
import PauseIcon from '../assets/pause-icon.svg';
import FullscreenIcon from '../assets/fullscreen-icon.svg';
import ExitFullscreenIcon from '../assets/exit-fullscreen-icon.svg';

export class VideoControls extends React.Component {

  static propTypes = {
    video: PropTypes.object,
    hls: PropTypes.object,
    onToggleFullscreen: PropTypes.func,
  }

  componentDidMount() {
    if (this.props.video) {
      this.attachVideo();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.video !== nextProps.video && nextProps.video) {
      this.attachVideo(nextProps.video);
    }
  }

  attachVideo = (video = this.props.video) => {
    video.addEventListener('progress', () => this.forceUpdate());
    video.addEventListener('pause', () => this.forceUpdate());
    video.addEventListener('play', () => this.forceUpdate());
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
    const FullscreenToggleButton = document.fullscreenElement ? ExitFullscreenIcon : FullscreenIcon;

    return (
      <div className={styles.videoControls}>
        <PlayPauseIcon className={styles.controlsButton} onClick={this.togglePause} />
        <div className={styles.spacer} />
        <div className={styles.levels}>
          <button className={styles.level} onClick={() => this.changeLevel(-1)}>Auto</button> /* -1 level is Auto in HLS.js */
          {levels}
        </div>
        <FullscreenToggleButton className={styles.controlsButton} onClick={this.props.onToggleFullscreen} />
      </div>
    );
  }
}
