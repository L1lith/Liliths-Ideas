const express = require('express');
const endpoints = ['login','logout','signup','validate'].map(endpoint=>require('./'+endpoint));
const {Router} = express;


module.exports = function(app,models){
  const auth = express.Router();
  endpoints.forEach(endpoint=>endpoint(app,models));
  app.use('/auth',auth);
}
