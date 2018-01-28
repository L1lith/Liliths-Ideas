const mergeArrays = require('../../functions/mergeArrays');
module.exports = function(app,models){
  const {
    Post
  } = models;
  let categories = null;
  app.get('/categories',(req,res)=>{
    if (!categories) return res.status(503).send();
    res.status(200).json(categories);
  });
  Post.distinct('tags', (err, result) => {
    if (err) throw err;
    categories = categories ? mergeArrays(categories,result) : result;
  });
  return arr => {
    if (!Array.isArray(arr)) throw new Error('Invalid Array to Merge');
    categories = categories ? mergeArrays(categories,arr) : arr;
  }
}
