function validate(router){
  router.get('/validate',(req,res)=>{
    res.status(200).send('Authorized');
  });
}
module.exports = validate;
