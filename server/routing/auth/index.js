const RateLimit = require('express-rate-limit');
const express = require('express');
const endpoints = ['login','logout','signup'].map(endpoint=>require('./'+endpoint));
const validate = require('./validate');

const limiter = new RateLimit({
  windowMs: 24*60*60*1000, // Day
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});

module.exports = function(app,models){
  const auth = express.Router();
  validate(auth,models);
  auth.use(limiter);
  endpoints.forEach(endpoint=>endpoint(auth,models));
  app.use('/auth',auth);
}
