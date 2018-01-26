const secure = require('./secure');
const pub = require('./public');
const defaultPage = require('./defaultPage');
const catchError = require('./catchError');

module.exports = function(app,models){
  secure(app,models);
  pub(app,models);
  defaultPage(app);
  catchError(app);
}
