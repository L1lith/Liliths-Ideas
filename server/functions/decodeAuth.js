function decodeAuth(req) {
  let auth = req.get('authorization');
  if (typeof auth == 'string' && auth.length > 0) {
    auth = auth.split(' ');
    if (auth.length === 2 && auth[0] === 'Basic') {
      auth = new Buffer(auth[1], 'base64').toString().split(':').filter(str=>str.length > 0);
      if (auth.length > 0) {
        return auth;
      }
    }
  }
  return null;
}
module.exports = decodeAuth;
