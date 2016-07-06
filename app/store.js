/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import promiseMiddleware from 'redux-promise-middleware';

import reducers from './redux/reducers';

const devtools = window.devToolsExtension || (() => noop => noop);

export default function configureStore(initialState = {}) {
  // Create the store with one middleware:
  // promiseMiddleware: Now able to use promises in actions
  const middlewares = [
    promiseMiddleware(),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
    devtools(),
  ];

  const store = createStore(
    combineReducers(reducers),
    fromJS(initialState),
    compose(...enhancers)
  );

  // Initialize it with no other reducers
  store.asyncReducers = {};
  return store;
}
