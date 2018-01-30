const path = require('path');
const fs = require('fs');

const imageDir = path.resolve(__dirname, '../../static/internal/backgrounds/');

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
    res.status(200).sendFile(path.resolve(imageDir,images[Math.floor(Math.random()*images.length)]),{maxAge:0});
  });
}
