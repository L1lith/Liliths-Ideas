const express = require('express');
const secureRequest = require('../middleware/secureRequest');
const stat = require('./static');
const logout = require('./logout');
const validateAuth = require('./validateAuth');
const {Router} = express;


module.exports = function(app,models){
  const secure = express.Router();
  secure.use(secureRequest(models));
  stat(secure);
  validateAuth(secure);
  logout(secure);
  app.use('/secure',secure);
}
