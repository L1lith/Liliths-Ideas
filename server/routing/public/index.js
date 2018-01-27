const stat = require('./static');
const post = require('./post');

module.exports = function(app,models){
  stat(app,models);
  post(app,models);
}
