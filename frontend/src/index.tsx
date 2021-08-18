import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import logger, { LogLevelDesc } from 'loglevel';

import store from '@messaging/redux/store';
import configs from '@messaging/config';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '@messaging/styles/main.scss';

logger.setLevel(configs.log.minLevel as LogLevelDesc);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
