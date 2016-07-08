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
  currentStream: state.event.event.stream_info, // If there is a currently playing video, it's not in the feed
}), { loadVideo })
export class VideoSelector extends React.Component {

  static propTypes = {
    accountId: PropTypes.string,
    eventId: PropTypes.string,
    fields: PropTypes.object,
    currentStream: PropTypes.object,
    handleSubmit: PropTypes.func,
    loadVideo: PropTypes.func,
    videos: PropTypes.array,
  }

  onSubmit = ({ videoId }) => {
    this.props.loadVideo(videoId, this.props.eventId, this.props.accountId);
  }

  render() {
    const { fields: { videoId }, handleSubmit } = this.props;

    const videoOptions = this.props.videos.map((video) => (
      <option value={video.id} key={video.id}>{video.id} - {video.caption}</option>
    ));

    if (this.props.currentStream) {
      // If the live stream is selected, it's not possible to get its info from the API (m3u8_url is null)
      // We need to handle this case separately
      videoOptions.push(<option value="currentStream" key={this.props.currentStream.live_video_post_id}>{this.props.currentStream.live_video_post_id} - {this.props.currentStream.stream_title}</option>);
    }

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
