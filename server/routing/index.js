const secure = require('./secure');
const pub = require('./public');
const auth = require('./auth');
const defaultPage = require('./defaultPage');
const catchError = require('./catchError');

module.exports = function(app,models){
  secure(app,models);
  pub(app,models);
  defaultPage(app);
  auth(app,models);
  catchError(app);
}
