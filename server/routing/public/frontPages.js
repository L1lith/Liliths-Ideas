module.exports = function(app,models){
  const {
    Post
  } = models;
  let postCount = null;
  Post.count((err,result)=>{
    if (err) return;
    if (typeof result == 'number') {
      postCount = result;
    }
  });
  app.get('/frontpages',(req,res)=>{
    if (postCount === null) return res.status(503).send('Unavailable');
    res.status(200).send(Math.floor(postCount / 10));
  });
  return {
    up:()=>if(postCount !== null) postCount++,
    down:()=>if(postCount !== null) postCount--
  }
}
