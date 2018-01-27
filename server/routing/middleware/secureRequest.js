module.exports = function(models,withUser=false) {
  const {User, Session} = models;

  return (req, res, next)=>{
    const session = req.cookies ? req.cookies.session : null;
    if (typeof session == 'string' && session.length > 0) {
      Session.findOne({
        _id: session
      }, (err, result) => {
        if (err) throw err;
        if (!result) return res.status(401).send('Unauthorized')
        res.locals.session = result;
        if (withUser === true) {
          User.findOne({username:result.owner},(err,user)=>{
            if (err || !user) return res.status(500).send('Internal Error');
            res.locals.user = user;
            next();
          });
        } else {
          next();
        }
      });
    } else {
      res.status(401).send('Unauthorized');
    }
  }
}
