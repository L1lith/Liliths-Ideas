const pub = require('./public');
const auth = require('./auth');
const defaultPage = require('./defaultPage');
const catchError = require('./catchError');

module.exports = function(app,models){
  auth(app,models);
  pub(app,models);
  defaultPage(app);
  catchError(app);
}
