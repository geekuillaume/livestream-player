import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { loadEvent } from 'redux/event';

import styles from '../styles.css';

@reduxForm({
  form: 'eventSelector',
  fields: ['eventId'],
}, (state) => ({
  accountId: state.event.accountId,
  eventId: state.event.eventId,
  events: state.event.account.upcoming_events.data.concat(state.event.account.past_events.data),
}), { loadEvent })
export class EventSelector extends React.Component {

  static propTypes = {
    accountId: PropTypes.string,
    eventId: PropTypes.string,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    loadEvent: PropTypes.func,
    events: PropTypes.array,
  }

  onSubmit = (data) => {
    this.props.loadEvent(data.eventId, this.props.accountId);
  }

  render() {
    const { fields: { eventId }, handleSubmit } = this.props;

    const eventsOptions = this.props.events.map((event) => (
      <option value={event.id} key={event.id}>{event.full_name}</option>
    ));

    return (
      <form className={styles.container} onSubmit={handleSubmit(this.onSubmit)}>
        <div className={styles.inputContainer}>
          <label>Event: </label>
          <select {...eventId} required>
            <option></option>
            {eventsOptions}
          </select>
        </div>
        <button type="submit">Load Event</button>
      </form>
    );
  }
}
