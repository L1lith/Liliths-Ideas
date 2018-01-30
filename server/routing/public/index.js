const sections = ['static','frontPage'].map(name=>require('./'+name));
const post = require('./post');
const frontPages = require('./frontPages');
const categories = require('./categories');

module.exports = function(app,models){
  sections.forEach(section=> section(app,models));
  const postNumber = frontPages(app,models);
  const addCategories = categories(app,models);
  post(app,models,addCategories,postNumber);
}
