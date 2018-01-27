const sanitize = require('../../functions/sanitize');
const giveSession = require('../../functions/giveSession');
const decodeAuth = require('../../functions/decodeAuth');
const bcrypt = require('bcrypt');

function login(router, models) {
  const {
    User
  } = models;
  router.get('/login', (req, res) => {
    const auth = decodeAuth(req);
    if (!auth || auth.length != 2) return res.status(400).send('Malformed Request');
    const username = auth[0].toLowerCase(),
      password = auth[1];
    if (username.length < 3 || password.length < 7) return res.status(400).send('Malformed Request');
    User.findOne({
      username
    }, (err, user) => {
      if (err) return res.status(500).send('Internal Error');
      if (!user) return res.status(401).send('Unauthorized');
      bcrypt.compare(password, user.hash, (err, match) => {
        if (err) return res.status(500).send('Internal Error');
        if (match === true) {
          giveSession(res, user, models).then(() => {
            res.status(200).send('Authorized');
          }).catch(err => {
            res.status(500).send('Internal Error');
          });
        } else {
          res.status(401).send('Unauthorized');
        }
      });
    });
  });
}
module.exports = login;
