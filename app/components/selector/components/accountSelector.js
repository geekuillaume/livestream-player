import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { loadAccount } from 'redux/event';

import styles from '../styles.css';

@reduxForm({
  form: 'accountSelector',
  fields: ['accountId'],
}, (state) => ({
  accountId: state.event.accountId,
}), { loadAccount })
export class AccountSelector extends React.Component {

  static propTypes = {
    accountId: PropTypes.string,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    loadAccount: PropTypes.func,
  }

  onSubmit = (data) => {
    this.props.loadAccount(data.accountId);
  }

  render() {
    const { fields: { accountId }, handleSubmit } = this.props;

    return (
      <form className={styles.inputContainer} onSubmit={handleSubmit(this.onSubmit)}>
        <label className={styles.label}>Account Id: </label>
        <input type="text" className={styles.input} {...accountId} required />
        <button type="submit" className={styles.submitButton}>Load Account</button>
      </form>
    );
  }
}
