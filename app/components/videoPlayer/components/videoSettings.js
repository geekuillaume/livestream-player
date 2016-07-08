import React, { PropTypes } from 'react';

import styles from '../styles.css';

import SettingsIcon from '../assets/settings-icon.svg';

export class VideoSettings extends React.Component {

  static propTypes = {
    hls: PropTypes.object,
  }

  constructor() {
    super();
    this.state = { settingsOpen: false };
  }

  // componentDidMount() {
  //   if (this.props.video) {
  //     this.attachVideo();
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.video !== nextProps.video && nextProps.video) {
  //     this.attachVideo(nextProps.video);
  //   }
  // }

  // attachVideo = (video = this.props.video) => {
    // video.addEventListener('progress', () => this.forceUpdate());
  // }

  changeLevel = (level) => {
    this.props.hls.nextLevel = level;
  }

  handleButtonClick = () => {
    this.setState({
      settingsOpen: !this.state.settingsOpen,
    });
  }

  render() {
    if (!this.props.hls) {
      return false;
    }

    // If we don't have the levels yet, don't show anything
    const levels = (this.props.hls.levels || []).map((level, i) => (
      <div className={styles.level} onClick={() => this.changeLevel(i)} key={i}>{level.width} x {level.height}</div>
    ));

    return (
      <div className={styles.settingsContainer}>
        <SettingsIcon className={styles.controlsButton} onClick={this.handleButtonClick} />
        {this.state.settingsOpen &&
          <div className={styles.settingsPopup}>
            {levels}
            <div className={styles.level} onClick={() => this.changeLevel(-1)}>Auto</div>
          </div>}
      </div>
    );
  }
}
