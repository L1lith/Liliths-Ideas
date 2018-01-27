const path = require('path');
module.exports = function(app){
  app.use(function (err, req, res, next) {
    console.log('error',err);
    res.status(500).sendFile(path.join('error.html'),{root:path.join(__dirname,'..','/static/internal/')});
  });
}
