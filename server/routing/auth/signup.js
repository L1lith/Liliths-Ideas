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
      if (err) throw err;
      const createUser = new User({
        username,
        displayname: username,
        hash,
        email
      });
      createUser.save(err => {
        if (err) throw err;
        const userOut = {
          username
        };
        await (giveSession(res, createUser, models));
        const output = {
          username: createUser.username,
          displayname: createUser.displayname,
          admin: createUser.admin
        };
        res.status(200).json(output);
      });
    });
  });
}
module.exports = signup;
