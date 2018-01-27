const express = require('express');
const endpoints = ['login','logout','signup','validate'].map(endpoint=>require('./'+endpoint));

module.exports = function(app,models){
  const auth = express.Router();
  endpoints.forEach(endpoint=>endpoint(auth,models));
  app.use('/auth',auth);
}
