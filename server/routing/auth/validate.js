const secureRequest = require('../middleware/secureRequest');

function validate(router, models) {
  const {User} = models;
  router.get('/validate', secureRequest(models));
  router.get('/validate', (req, res) => {
    User.findOne({username:res.locals.session.owner},user=>{
      if (!user) throw new Error('Could not find session owner');
      const output = {
        username: user.username,
        displayname: user.displayname,
        admin: user.admin
      };
      res.status(200).json(output);
    });
  });
}
module.exports = validate;
