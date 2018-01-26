const express = require('express');
const path = require('path');

module.exports = function(router){
  router.use(express.static(path.join(__dirname,'../../static/secure')));
}
