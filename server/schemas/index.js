const schemas = ['user', 'post', 'session'];

const output = {};
schemas.forEach(filename => {
  output[filename] = require('./' + filename)
});

module.exports = output;
