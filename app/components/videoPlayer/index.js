import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Hls from 'hls.js';

import { VideoControls } from './components/videoControls';
import styles from './styles.css';

@connect((state) => ({
  video: state.event.video,
}))
export class VideoPlayer extends React.Component {

  static propTypes = {
    video: PropTypes.object,
  }

  componentDidMount() {
    if (this.props.video) {
      this.startVideo();
    }
    document.addEventListener('fullscreenchange', () => this.forceUpdate());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.video && nextProps.video &&
      this.props.video.m3u8_url !== nextProps.video.m3u8_url && this.hls) {
      this.hls.destroy();
    }
    if (!nextProps.video) {
      return;
    }
    this.startVideo(nextProps.video);
  }

  onManifestParsed = () => {
    this.refs.video.play();
    this.forceUpdate(); // Used for hot-reloading
  }

  startVideo = (video = this.props.video) => {
    this.hls = new Hls;
    this.hls.attachMedia(this.refs.video);
    this.hls.loadSource(video.m3u8_url);
    this.hls.on(Hls.Events.MANIFEST_PARSED, this.onManifestParsed);
    this.forceUpdate(); // Used for hot-reloading, else the controls are not loaded
  }

  toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      this.refs.container.requestFullscreen();
    }
  }

  render() {
    if (!Hls.isSupported()) {
      return <div className={styles.notSupported}>HLS is not supported</div>;
    }

    return (
      <div className={classNames(styles.container, { [styles.fullscreenEnabled]: document.fullscreenElement })} ref="container">
        <div className={styles.videoContainer}>
          <video ref="video" />
          <VideoControls video={this.refs.video} hls={this.hls} onToggleFullscreen={this.toggleFullscreen} />
        </div>
      </div>
    );
  }
}
