import React from 'react';
import { connect } from 'react-redux';

import styles from './styles.css';

@connect()
export class VideoPlayer extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        VIDEO PLAYER IS HERE !
      </div>
    );
  }
}
