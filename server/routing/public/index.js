const sections = ['static','frontPage'].map(name=>require('./'+name));
const post = require('./post');
const categories = require('./categories');

module.exports = function(app,models){
  sections.forEach(section=> section(app,models));
  const addCategories = categories(app,models);
  post(app,models,addCategories);
}
