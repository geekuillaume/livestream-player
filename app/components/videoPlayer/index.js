import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Hls from 'hls.js';

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

  onManifestParsed = (event, data) => {
    this.setState({ levels: data.levels });
    this.refs.video.play();
  }

  changeLevel = (level) => {
    this.hls.nextLevel = level;
  }

  render() {
    if (!Hls.isSupported()) {
      return <div className={styles.notSupported}>HLS is not supported</div>;
    }

    const levels = this.state.levels.map((level, i) => (
      <button className={styles.level} onClick={() => this.changeLevel(i)} key={i}>{level.width} x {level.height}</button>
    ));

    return (
      <div className={styles.container}>
        <div className={styles.levels}>
          <button className={styles.level} onClick={() => this.changeLevel(-1)}>Auto</button>
          {levels}
        </div>
        <video ref="video" controls />
      </div>
    );
  }
}
