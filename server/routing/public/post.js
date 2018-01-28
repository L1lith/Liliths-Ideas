const sanitize = require('../../functions/sanitize');
const secureRequest = require('../middleware/secureRequest');

function post(app,models){
  const {
    Post
  } = models;
  // GET POST
  app.get('/post',withPost(models));
  app.get('/post',(req,res)=>{
    const searchID = req.query.id;
    if (typeof searchID != 'string' || searchID.length < 1) return res.status(400).send('Malformed Request');
    const post = res.locals.post;
    res.status(200).json({title:post.title,content:post.content,created:post.createdAt,tags:post.tags});
  });
  // CREATE POST
  app.put('/post',secureRequest(models,true));
  app.put('/post',(req,res)=>{
    const user = res.locals.user;
    if (user.admin !== true) return res.status(401).send('Unauthorized');
    const postData = req.body;
    if (typeof postData != 'object' || !sanitize(postData,{title:'string',content:'string',tags:['string']})) return res.status(400).send('Malformed Request');
    const newPost = new Post(postData);
    newPost.save((err,post)=>{
      if (err || !post) return res.status(500).send('Internal Error');
      res.status(201).sent(post._id);
    });
  });
  app.delete('/post',secureRequest(models,true));
  app.delete('/post',withPost(models));
  app.delete('/post',(req,res)=>{
    if (res.locals.user.admin !== true) return res.status(401).send('Unauthorized');
    res.locals.post.remove(err=>{
      if (err) return res.status(500).send('Internal Error');
      res.status(200).send('Deleted');
    });
  });
}
function withPost(models){
  const {
    Post
  } = models;
  return (req,res,next)=>{
    if (typeof req.query.id != 'string' || req.query.id.length < 1) return res.status(400).send('Malformed Request');
    Post.findOne({_id:req.query.id},(err,post)=>{
      if (err) return res.status(500).send('Internal Error');
      if (!post) return res.status(404).send('Post Not Found');
      res.locals.post = post;
      next();
    });
  }
}
module.exports = post;
