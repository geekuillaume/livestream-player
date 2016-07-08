import typeToReducer from 'type-to-reducer';
import config from 'config.js';
import { checkOk, bodyToJson } from 'utils/fetch';

const initialState = {
  accountId: '',
};

const LOAD_ACCOUNT = 'livestreamPlayer/event/loadAccount';
const LOAD_EVENT = 'livestreamPlayer/event/loadEvent';
const LOAD_VIDEO = 'livestreamPlayer/event/loadVideo';
const LOAD_CURRENT = 'livestreamPlayer/event/loadCurrent';

export function loadAccount(accountId) {
  return {
    type: LOAD_ACCOUNT,
    payload: fetch(`${config.APIUrl}/accounts/${accountId}`).then(checkOk()).then(bodyToJson()),
    meta: { accountId },
  };
}

export function loadEvent(eventId, accountId) {
  return {
    type: LOAD_EVENT,
    payload: fetch(`${config.APIUrl}/accounts/${accountId}/events/${eventId}`).then(checkOk()).then(bodyToJson()),
    meta: { eventId, accountId },
  };
}

export function loadVideo(videoId, eventId, accountId) {
  if (videoId === 'currentStream') {
    return {
      type: LOAD_CURRENT,
    };
  }
  return {
    type: LOAD_VIDEO,
    payload: fetch(`${config.APIUrl}/accounts/${accountId}/events/${eventId}/videos/${videoId}`).then(checkOk()).then(bodyToJson()),
    meta: { videoId, eventId, accountId },
  };
}

export const eventReducer = typeToReducer({
  [LOAD_ACCOUNT]: {
    PENDING: (state, { meta }) => ({ ...state, accountId: meta.accountId, accountError: false }),
    FULFILLED: (state, { payload }) => ({ ...state, account: payload, accountError: false }),
    REJECTED: (state, { error }) => ({ ...state, accountError: error }),
  },
  [LOAD_EVENT]: {
    PENDING: (state, { meta }) => ({ ...state, eventId: meta.eventId, eventError: false }),
    FULFILLED: (state, { payload }) => ({ ...state, event: payload, eventError: false }),
    REJECTED: (state, { error }) => ({ ...state, eventError: error }),
  },
  [LOAD_VIDEO]: {
    PENDING: (state, { meta }) => ({ ...state, videoId: meta.videoId, video: null, videoError: false }),
    FULFILLED: (state, { payload }) => ({ ...state, video: payload, videoError: false }),
    REJECTED: (state, { error }) => ({ ...state, videoError: error }),
  },
  [LOAD_CURRENT]: (state) => ({ ...state,
    videoId: state.event.stream_info.live_video_post_id,
    video: { // We need the m3u8 url from the parent object because the API is returning null inside the child object
      ...state.event.stream_info.live_video_post,
      m3u8_url: state.event.stream_info.m3u8_url,
    },
  }),
}, initialState);
