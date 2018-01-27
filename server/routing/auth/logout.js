const secureRequest = require('../middleware/secureRequest');
function logout(router,models){
  router.use('/logout',secureRequest(models));
  router.get('/logout',(req,res)=>{
    res.locals.session.remove(err=>{
      if (err) return res.status(500).send('Internal Error');
      res.clearCookie("session");
      res.status(200).send('Logged Out.');
    });
  });
}
module.exports = logout;
