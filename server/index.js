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
      if (process.env.NODE_ENV === 'development') {
        app.listen(port, err => {
          if (err) return reject(err);
          resolve(app);
        });
      } else {
        console.log('Starting LEX');
        const LEXConfig = {
          server: 'staging',
          email: config.email,
          agreeTos: true,
          approveDomains: config.domains || [],
          app
        }
        const lex = letsencryptExpress.create(LEXConfig);
        const httpServer = http.createServer(lex.middleware(require('redirect-https')()));
        const httpsServer = http2.createServer(lex.httpsOptions, lex.middleware(app));
        httpServer.listen(80, function () {
          console.log("Listening for ACME http-01 challenges on", this.address());
        });
        httpsServer.listen(443, function () {
          console.log("Listening for ACME tls-sni-01 challenges and serve app on", this.address());
        });
        resolve(httpsServer);
      }
    }).catch(err => {
      reject(err);
    });
  });
}

module.exports = startServer;
