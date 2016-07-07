import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { loadVideo } from 'redux/event';

import styles from '../styles.css';

@reduxForm({
  form: 'videoSelector',
  fields: ['videoId'],
}, (state) => ({
  accountId: state.event.accountId,
  eventId: state.event.eventId,
  videos: state.event.event.feed.data.filter((data) => data.type === 'video').map((data) => data.data),
}), { loadVideo })
export class VideoSelector extends React.Component {

  static propTypes = {
    accountId: PropTypes.string,
    eventId: PropTypes.string,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    loadVideo: PropTypes.func,
    videos: PropTypes.array,
  }

  onSubmit = (data) => {
    this.props.loadVideo(data.videoId, this.props.eventId, this.props.accountId);
  }

  render() {
    const { fields: { videoId }, handleSubmit } = this.props;

    const videoOptions = this.props.videos.map((video) => (
      <option value={video.id} key={video.id}>{video.caption}</option>
    ));

    return (
      <form className={styles.container} onSubmit={handleSubmit(this.onSubmit)}>
        <div className={styles.inputContainer}>
          <label>Video: </label>
          <select {...videoId} required>
            <option></option>
            {videoOptions}
          </select>
        </div>
        <button type="submit">Play Video</button>
      </form>
    );
  }
}
