import React from 'react';

import { Selector } from 'components/selector';
import { VideoPlayer } from 'components/videoPlayer';

import styles from './styles.css';

import Logo from './assets/livestream-logo.png';

export class DemoApp extends React.Component {

  render() {
    return (
      <div className={styles.container}>
        <img src={Logo} alt="logo" className={styles.logo} />

        <h1>Livestream demo player</h1>
        <p>This is a player I created for the coding assignment for the position at Livestream</p>

        <Selector />
        <VideoPlayer />
      </div>
    );
  }
}
