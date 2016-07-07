import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

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

  constructor() {
    super();
    this.state = {
      levels: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.video && nextProps.video &&
      this.props.video.m3u8_url !== nextProps.video.m3u8_url && this.hls) {
      this.hls.destroy();
    }
    if (!nextProps.video) {
      return;
    }
    this.hls = new Hls;
    this.hls.attachMedia(this.refs.video);
    this.hls.loadSource(nextProps.video.m3u8_url);
    this.hls.on(Hls.Events.MANIFEST_PARSED, this.onManifestParsed);
  }

  onManifestParsed = () => {
    this.refs.video.play();
  }

  render() {
    if (!Hls.isSupported()) {
      return <div className={styles.notSupported}>HLS is not supported</div>;
    }

    return (
      <div className={styles.container}>
        <div className={styles.videoContainer}>
          <video ref="video" />
          <VideoControls video={this.refs.video} hls={this.hls} />
        </div>
      </div>
    );
  }
}
