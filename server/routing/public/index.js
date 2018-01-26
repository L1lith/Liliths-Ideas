const stat = require('./static');
const login = require('./login');
const signup = require('./signup');

module.exports = function(app,models){
  stat(app,models);
  login(app,models);
  signup(app,models);
}
