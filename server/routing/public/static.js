const express = require('express');
const path = require('path');

module.exports = function(app){
  app.use('/images',(req,res,next)=>{
    if (!res.getHeader('Cache-Control')) res.setHeader('Cache-Control', 'public, max-age=' + (60*60*24*30));
    next();
  });
  app.use(express.static(path.join(__dirname,'../../../client/public')));
  app.use(express.static(path.join(__dirname,'../../static/build')));
}
