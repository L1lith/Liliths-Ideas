const createServer = require('./app');

const port = require('./config').port || 8000;

function startServer(){
  return new Promise((resolve,reject)=>{
    createServer().then(app => {
      app.listen(port, err => {
        if (err) return reject('Error Starting Express App');
        if (require.main === module) console.log(`Server Listening on Port ${port}`);
        resolve(port);
      });
    }).catch((err, details) => {
      reject('Error Requiring Express App');
    });
  });
}

module.exports = startServer;
