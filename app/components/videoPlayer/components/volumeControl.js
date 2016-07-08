import React, { PropTypes } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import styles from '../styles.css';

import VolumeIcon from '../assets/volume-icon.svg';

export class VolumeControl extends React.Component {

  static propTypes = {
    video: PropTypes.object,
  }

  constructor() {
    super();
    this.state = { volumeOpen: false };
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

  handleButtonClick = () => {
    this.setState({
      volumeOpen: !this.state.volumeOpen,
    });
  }

  attachVideo = (video = this.props.video) => {
    video.addEventListener('progress', () => this.forceUpdate());
  }

  handleVolumeChange = (val) => {
    this.props.video.volume = val / 100;
  }

  render() {
    return (
      <div className={styles.volumeContainer}>
        <VolumeIcon className={styles.controlsButton} onClick={this.handleButtonClick} />
        {this.state.volumeOpen &&
          <div className={styles.volumePopup}>
            <Slider
              tipTransitionName="rc-slider-tooltip-zoom-down"
              onChange={this.handleVolumeChange}
              vertical
              defaultValue={this.props.video.volume * 100}
              className={styles.volumeSlider}
            />
          </div>}
      </div>
    );
  }
}
