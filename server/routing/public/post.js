const sanitize = require('../../functions/sanitize');

function post(app,models){
  const {
    Post
  } = models;
  // GET POST
  app.get('/post',(req,res)=>{
    const searchID = req.query.id;
    if (typeof searchID != 'string' || searchID.length < 1) return res.status(400).send('Malformed Request');
    Post.find({_id:searchID},(err,post)=>{
      if (err) return res.status(500).send('Internal Error');
      if (post) {
        res.status(200).json({title:post.title,content:post.content,created:post.createdAt,tags:post.tags});
      } else {
        res.status(404).send('Post Not Found');
      }
    });
  });
  // CREATE POST
  app.put('/post',(req,res)=>{
    
  });
}
module.expoets = post;
