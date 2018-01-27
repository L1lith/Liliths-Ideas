const giveSession = require('../../functions/giveSession');
const sanitize = require('../../functions/sanitize');
const getValidEmail = require('../../functions/getValidEmail');
const bcrypt = require('bcrypt');

function signup(router, models) {
  const {
    User
  } = models;
  router.post('/signup', (req, res) => {
    if (!sanitize(req.body, {
        username: 'string',
        password: 'string',
        email: 'string'
      })) return res.status(400).send('Invalid Request');
    let {
      username,
      password,
      email
    } = req.body;
    username = username.toLowerCase().split(' ').join('');
    if (username.length < 3 || password.length < 7) return res.status(400).send('Invalid Request');
    email = getValidEmail(email);
    if (!email) return res.status(400).send('Invalid Request');
    bcrypt.hash(password, 12, (err, hash) => {
      if (err) return res.status(500).send('Internal Error');
      const createUser = new User({
        username,
        displayname: username,
        hash,
        email
      });
      createUser.save(err => {
        if (err) return res.status(500).send('Internal Error');
        const userOut = {
          username
        };
        giveSession(res, createUser, models).then(() => {
          res.status(200).send('Authorized');
        }).catch(err => {
          res.status(500).send('Internal Error');
        });
      });
    });
  });
}
module.exports = signup;
