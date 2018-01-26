module.exports = function(router){
  router.get('/validateauth',(req,res)=>{
    res.status(200).send('Authorized');
  });
}
