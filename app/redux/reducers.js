import { reducer as formReducer } from 'redux-form';
import { eventReducer } from './event';

export default {
  event: eventReducer,
  form: formReducer,
};
