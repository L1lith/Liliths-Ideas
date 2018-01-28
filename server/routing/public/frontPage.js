const isInteger = require('../../functions/isInteger');
const resultsPerPage = 10;
module.exports = (app,models)=>{
  const {
    Post
  } = models;
  app.get('/frontpage',(req,res)=>{
    if (req.query.hasOwnProperty('page') && (typeof req.query.page != 'string' || req.query.page.length < 1 || !isInteger(req.query.page))) return res.status(400).send('Malformed Request');
    const pageNumber = req.query.hasOwnProperty('page') ? parseInt(req.query.page) : 1;
    if (pageNumber < 1) return res.status(400).send('Malformed Request');
    Post.find().sort({createdAt:-1}).lean().skip((pageNumber - 1 ) * resultsPerPage).limit(resultsPerPage).exec((err,posts)=>{
      if (err) return res.status(500).send('Internal Error');
      res.status(200).send(posts.map(post=>{return {id:post._id,title:post.title,content:post.content,creator:post.creator,created:post.createdAt,tags:post.tags,version:post.__v}}));
    });
  });
}
