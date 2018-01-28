const createApp = require('./app');
const spdy = require('spdy');

const port = require('./config').port || 8000;

if (require.main === module) {
  startServer();
}

function startServer(){
  console.log(`Server Listening on Port ${port}`);
  return new Promise((resolve,reject)=>{
    createApp().then(app => {
      const server = spdy.createServer({ssl: false},app);
      server.listen(port, err => {
        if (err) return reject(err);
        resolve(server);
      });
    }).catch(err => {
      reject(err);
    });
  });
}

module.exports = startServer;
