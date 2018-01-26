const path = require('path');

module.exports = function(app){
  app.get('*', function(req, res, next) {
    if (req.accepts('html')) {
      res.status(200).sendFile('index.html',{root:path.join(__dirname,'..','/static/public/')});
    } else {
      next();
    }
  });
}
