const express = require('express');
const secureRequest = require('../middleware/secureRequest');
const stat = require('./static');


module.exports = function(app,models){
  const secure = express.Router();
  secure.use(secureRequest(models));
  stat(secure);
  app.use('/secure',secure);
}
