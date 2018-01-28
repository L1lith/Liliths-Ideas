const LEX = require('letsencrypt-express');
const createApp = require('./app');

const port = require('./config').port || 8000;

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
        const server = LEX.create({
          server: 'staging',
          email: 'lily@lillith.pw',
          agreeTos: true,
          approveDomains: [
          ],
          app
        });
        server.listen(80, 443);
        resolve(server);
      }
    }).catch(err => {
      reject(err);
    });
  });
}

module.exports = startServer;
