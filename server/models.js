const mongoose = require('mongoose');
const schemas = require('./schemas');
const titleCase = require('./functions/titleCase');
const config = Object.assign({
  host: 'localhost',
  port: 27017,
  name: 'blog'
}, require('./config').db || undefined);
const URI = `mongodb://${config.host}:${config.port}/${config.name}`;

function getModels(){
  return new Promise((resolve, reject) => {
    mongoose.connect(URI, err => {
      if (err) {
        reject(err);
      } else {
        const output = {};
        Object.entries(schemas).forEach(schemaPair => {
          const title = titleCase(schemaPair[0]);
          output[title] = mongoose.model(title, new mongoose.Schema(schemaPair[1]))
        });
        resolve(output);
      }
    });
  });
}

module.exports = getModels;
