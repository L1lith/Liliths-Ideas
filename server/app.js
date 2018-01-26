const express = require('express');
const helmet = require('helmet');
const forceSSL = require('express-force-ssl');
const bodyParser = require('body-parser');
const routing = require('./routing');
const cookieParser = require('cookie-parser');

let resolve;
let reject;

const successful = new Promise((res, rej) => {
  resolve = res;
  reject = rej;
});

require('./models').then(models => {

  const app = express();

  //app.use(forceSSL);
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(cookieParser());
  routing(app, models);

  resolve(app);
}).catch(err => {
  reject('Mongoose Error');
});

module.exports = successful;
