const express = require('express');
const path = require('path');

module.exports = function(app){
  app.use(express.static(path.join(__dirname,'../../../client/public')));
  app.use(express.static(path.join(__dirname,'../../static/build')));
}
