module.exports = function(models) {
  const {Session} = models;

  return (req, res, next)=>{
    const session = req.cookies ? req.cookies.session : null;
    if (typeof session == 'string' && session.length > 0) {
      Session.findOne({
        _id: session
      }, (err, result) => {
        if (err) return res.status(500).send('Internal Error');
        if (!result) return res.status(401).send('Unauthorized')
        res.locals.session = result;
        next();
      });
    } else {
      res.status(401).send('Unauthorized');
    }
  }
}
