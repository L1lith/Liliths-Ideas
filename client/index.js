import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter
} from 'react-router-dom'

if (checkLoaded()) {
  execute();
} else {
  window.addEventListener('load',execute);
}
function execute(){
  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
  registerServiceWorker();
}
function checkLoaded() {
  return document.readyState === "complete";
}
