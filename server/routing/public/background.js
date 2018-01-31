const path = require('path');
const fs = require('fs');
const express = require('express');

const imageDir = path.resolve(__dirname, '../../static/backgrounds/');

module.exports = function(app,models){
  let images = null;
  fs.readdir(imageDir,(err,results)=>{
    if (err) return;
    if (results) {
      results = results.filter(name=>!name.endsWith('.gitignore'));
      if (results.length > 0) {
        images = results;
      }
    }
  });
  app.get('/background',(req,res)=>{
    if (images === null) return res.status(503).send('Unavailable');
    res.set('Cache-Control','no-cache');
    res.redirect(307,'/backgrounds/'+images[Math.floor(Math.random()*images.length)]);
  });
  app.use('/backgrounds',express.static(imageDir,{maxAge: 1000 * 60 * 60 * 24 * 365 * 10}));
}
