const path = require('path');
const fs = require('fs');
const express = require('express');

const imageDir = path.resolve(__dirname, '../../static/backgrounds/');

module.exports = function(app,models){
  let images = null;
  fs.readdir(imageDir,(err,results)=>{
    if (err) return;
    if (results && results.length > 0) {
      images = results;
    }
  });
  app.get('/background',(req,res)=>{
    if (images === null) return res.status(503).send('Unavailable');
    res.sendFile('/backgrounds/'+images[Math.floor(Math.random()*images.length)],{maxAge:1000 * 60 * 60 * 24});
  });
}
