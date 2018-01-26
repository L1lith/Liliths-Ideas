let resolve;
let reject;
const successful = new Promise((res, rej) => {
  resolve = res;
  reject = rej;
});

const port = require('./config').port || 8000;
require('./app').then(app => {
  app.listen(port, err => {
    if (err) return reject('Error Starting Express App');
    if (require.main === module) {
      console.log(`Server Listening on Port ${port}`);
    }
    resolve(port);
  });
}).catch((err, details) => {
  reject('Error Requiring Express App', err, details);
});

module.exports = successful;
