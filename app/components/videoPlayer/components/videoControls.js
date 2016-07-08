import React, { PropTypes } from 'react';

import styles from '../styles.css';

import { SeekBar } from './seekbar';
import { VideoSettings } from './videoSettings';

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

    // Choosing the right icon depending on the state of the video
    const PlayPauseIcon = this.props.video.paused ? PlayIcon : PauseIcon;
    const FullscreenToggleButton = document.fullscreenElement ? ExitFullscreenIcon : FullscreenIcon;

    return (
      <div className={styles.videoControls}>
        <PlayPauseIcon className={styles.controlsButton} onClick={this.togglePause} />
        <SeekBar video={this.props.video} />
        <VideoSettings hls={this.props.hls} />
        <FullscreenToggleButton className={styles.controlsButton} onClick={this.props.onToggleFullscreen} />
      </div>
    );
  }
}
