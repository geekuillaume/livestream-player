import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Draggable from 'react-draggable';

import styles from '../styles.css';

export class SeekBar extends React.Component {

  static propTypes = {
    video: PropTypes.object,
    hls: PropTypes.object,
    className: PropTypes.string,
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

  shouldComponentUpdate() {
    return !this.dragging;
  }

  attachVideo = (video = this.props.video) => {
    video.addEventListener('progress', this.updateFromVideo);
    video.addEventListener('pause', this.updateFromVideo);
    video.addEventListener('play', this.updateFromVideo);
  }

  updateFromVideo = () => {
    if (!this.dragging) {
      this.forceUpdate();
    }
  }

  handleStop = (e, data) => {
    this.dragging = false;
    this.props.video.currentTime = (data.x / this.refs.bar.offsetWidth) * this.props.video.duration;
  }

  handleDrag = () => {
    this.dragging = true;
  }

  handleBarClick = (e) => {
    this.props.video.currentTime = ((e.clientX - this.refs.bar.getBoundingClientRect().left) / this.refs.bar.offsetWidth) * this.props.video.duration;
  }

  render() {
    const { video } = this.props;
    const seekPosition = {
      x: video.currentTime / video.duration,
      y: 0,
    };

    if (this.refs.bar) {
      seekPosition.x *= this.refs.bar.offsetWidth;
    }

    return (
      <div className={classnames(styles.seekbar)} ref="bar" onClick={this.handleBarClick}>
        <Draggable
          axis="x"
          bounds="parent"
          position={seekPosition}
          onDrag={this.handleDrag}
          onStop={this.handleStop}
        >
          <div className={styles.seekbarButton} />
        </Draggable>
      </div>
    );
  }
}
