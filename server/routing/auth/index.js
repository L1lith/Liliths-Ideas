const RateLimit = require('express-rate-limit');
const express = require('express');
const endpoints = ['login','logout','signup','validate'].map(endpoint=>require('./'+endpoint));

const limiter = new RateLimit({
  windowMs: 60*60*1000, // Hour
  max: 25, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});

module.exports = function(app,models){
  const auth = express.Router();
  auth.use(limiter);
  endpoints.forEach(endpoint=>endpoint(auth,models));
  app.use('/auth',auth);
}
