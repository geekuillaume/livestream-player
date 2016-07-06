import React from 'react';
import { connect } from 'react-redux';

import styles from './styles.css';

@connect()
export class VideoSelector extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        VIDEO SELECTOR IS HERE !
      </div>
    );
  }
}
