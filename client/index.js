import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from '@redux/store';

import {
  BrowserRouter
} from 'react-router-dom'

if (checkLoaded()) {
  execute();
} else {
  window.addEventListener('load',execute);
}
function execute(){
  ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
  registerServiceWorker();
}
function checkLoaded() {
  return document.readyState === "complete";
}
