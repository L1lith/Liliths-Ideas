const secureRequest = require('../middleware/secureRequest');

function validate(router, models) {
  const {
    User
  } = models;
  router.get('/validate', secureRequest(models,true));
  router.get('/validate', (req, res) => {
    const user = res.locals.user;
    res.status(200).json({
      username: user.username,
      displayname: user.displayname,
      admin: user.admin
    });
  });
}
module.exports = validate;
