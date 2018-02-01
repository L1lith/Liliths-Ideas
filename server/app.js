const express = require('express');
const helmet = require('helmet');
const forceSSL = require('express-force-ssl');
const bodyParser = require('body-parser');
const routing = require('./routing');
const cookieParser = require('cookie-parser');
const getModels = require('./models');
const httpsRedirect = require('express-https-redirect');
const compression = require('compression')

function createApp(){
  return new Promise((resolve,reject)=>{
    getModels().then(models => {

      const app = express();

      //app.use(forceSSL);
      app.use(helmet());
      if (process.env.NODE_ENV === 'production') {
        app.use(httpsRedirect);
      }
      app.use(bodyParser.json());
      app.use(cookieParser());
      app.use(compression());
      routing(app, models);

      resolve(app);
    }).catch(err => {
      reject(err);
    });
  });
}

module.exports = createApp;
