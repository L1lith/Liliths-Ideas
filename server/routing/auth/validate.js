const secureRequest = require('../middleware/secureRequest');
function validate(router,models){
  router.use('/validate',secureRequest(models));
  router.get('/validate',(req,res)=>{
    res.status(200).send('Authorized');
  });
}
module.exports = validate;
