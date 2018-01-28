const stat = require('./static');
const post = require('./post');
const frontPage = require('./frontPage');

module.exports = function(app,models){
  stat(app,models);
  post(app,models);
  frontPage(app,models);
}
