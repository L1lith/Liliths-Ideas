const getSession = require('./getSession');

function giveSession(res, user, models) {
  if (typeof res != 'object' || typeof user != 'object' || typeof models != 'object') throw new Error('GiveSession: Invalid Session/Request/Models');
  return new Promise((resolve, reject) => {
    getSession(user, models).then(session => {
      res.cookie('session', session._id, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: true
      });
      res.cookie('username',session.owner,{
        maxAge: 1000 * 60 * 60 * 24 * 30 * 10,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: true
      });
      resolve(session);
    }).catch(err => reject(err));
  });
}

module.exports = giveSession;
