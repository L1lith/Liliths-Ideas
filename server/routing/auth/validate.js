const secureRequest = require('../middleware/secureRequest');
const getUser = require('../../functions/getUser');

function validate(router, models) {
  const {
    User
  } = models;
  router.get('/validate', secureRequest(models));
  router.get('/validate', (req, res) => {
    getUser(res.locals.session, models).then(user => {
      if (user) {
        res.status(200).json({
          username: user.username,
          displayname: user.displayname,
          admin: user.admin
        });
      } else {
        res.status(401).send('Unauthorized');
      }
    }).catch(err => {
      res.status(500).send('Internal Error');
    });
  });
}
module.exports = validate;
