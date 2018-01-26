function logout(app,models){
  app.get('/logout',(req,res)=>{
    res.locals.session.remove(err=>{
      console.log('enis',err);
      if (err) return res.status(500).send('Internal Error');
      res.status(200).send('Logged Out.');
    });
  });
}
module.exports = logout;
