/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
import 'babel-polyfill';

// It is needed to load the favicon this way to add it to the build process
import 'file?name=[name].[ext]!./favicon.ico';

// Used for the fullscreen feature of the player
import 'fullscreen-api-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

// Create redux store
const initialState = {};
const store = configureStore(initialState);

import { Selector } from 'components/selector';
import { VideoPlayer } from 'components/videoPlayer';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Selector />
      <VideoPlayer />
    </div>
  </Provider>,
  document.getElementById('app')
);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
// import { install } from 'offline-plugin/runtime';
// install();
