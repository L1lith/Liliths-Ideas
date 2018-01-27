const secureRequest = require('../middleware/secureRequest');

function logout(router, models) {
  router.get('/logout', secureRequest(models));
  router.get('/logout', (req, res) => {
    res.locals.session.remove(err => {
      if (err) throw err;
      res.clearCookie("session");
      res.status(200).send('Logged Out.');
    });
  });
}
module.exports = logout;
