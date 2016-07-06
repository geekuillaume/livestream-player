import { fromJS } from 'immutable';
import typeToReducer from 'type-to-reducer';
import config from 'config.js';

const initialState = fromJS({
  id: '',
});

const LOAD = 'livestreamPlayer/event/load';

export function load(id) {
  return {
    type: LOAD,
    payload: fetch(`${config.APIUrl}/accounts/1818635/events/${id}`),
    meta: { id },
  };
}

export const eventReducer = typeToReducer({
  [LOAD]: {
    PENDING: (state, { meta }) => state.set('id', meta.id),
    FULFILLED: (state, { payload }) => state.set('data', payload),
    REJECTED: (state, { payload }) => state.set('error', payload),
  },
}, initialState);
