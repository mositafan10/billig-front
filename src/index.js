import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import reducer from './store/reducers/auth';
import TagManager from 'react-gtm-module'
import {initializeFirebase, askForPermissioToReceiveNotifications} from './fcm/InitFcm';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhances(
    applyMiddleware(thunk)
));

const tagManagerArgs = {
  gtmId: 'GTM-TDR32GN',
  auth: 'EkJLDjzNVHP31jg4nR6Gfw',
  preview: 'env-1'
}
TagManager.initialize(tagManagerArgs)

const app = (
   <Provider store={store}>
     <App />
   </Provider>
)

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function(registration) {
    })
    .catch(function(err) {
    });
}

initializeFirebase();
askForPermissioToReceiveNotifications();

ReactDOM.render(app, document.getElementById('root'));


if (module.hot) {
  module.hot.accept();
  }