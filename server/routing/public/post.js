const sanitize = require('../../functions/sanitize');
const secureRequest = require('../middleware/secureRequest');

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
  app.put('/post',secureRequest(models,true));
  app.put('/post',(req,res)=>{
    const user = res.locals.user;
    if (user.admin !== true) return res.status(401).send('Unauthorized');
    const postData = req.body;
    if (typeof postData != 'object' || !sanitize(postData,{title:'string',content:'string',tags:['string']})) return res.status(400).send('Malformed Request');
    const newPost = new Post(postData);
    console.log(postData,sanitize(postData,{title:'string',content:'string',tags:['string']}));
    newPost.save((err,post)=>{
      if (err || !post) return res.status(500).send('Internal Error');
      res.status(201).send(post._id);
    });
  });
}
module.exports = post;
