const letsencryptExpress = require('letsencrypt-express');
const createApp = require('./app');
const config = require('./config') || {};
const port = config.port || 8000;
const http = require('http');
const http2 = require('http2');

if (require.main === module) {
  startServer();
}

function startServer() {
  console.log(`Server Listening on Port ${port}`);
  return new Promise((resolve, reject) => {
    createApp().then(app => {
      app.listen(port, err => {
        if (err) return reject(err);
        resolve(app);
      });
    }).catch(err => {
      reject(err);
    });
  });
}

module.exports = startServer;
