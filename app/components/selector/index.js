import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { AccountSelector } from './components/accountSelector';
import { EventSelector } from './components/eventSelector';
import { VideoSelector } from './components/videoSelector';

import styles from './styles.css';

@connect((state) => ({
  account: state.event.account,
  event: state.event.event,
  video: state.event.video,
}))
export class Selector extends React.Component {

  static propTypes = {
    account: PropTypes.object,
    event: PropTypes.object,
    video: PropTypes.object,
  }

  render() {
    return (
      <div className={styles.container}>
        <p>Choose a video !</p>
        <AccountSelector />
        {this.props.account ? <EventSelector /> : false}
        {this.props.event ? <VideoSelector /> : false}
      </div>
    );
  }
}
