const stat = require('./static');
const post = require('./post');
const frontPage = require('./frontPage');
const categories = require('./categories');

module.exports = function(app,models){
  const addCategories = categories(app,models);
  stat(app,models);
  post(app,models,addCategories);
  frontPage(app,models);
}
