function getUser(session,models){
  if (typeof session != 'object') throw new Error("GetUser: Invalid Session Object");
  const {
    User
  } = models;
  return new Promise((resolve,reject)=>{
    User.findOne({username:session.owner},(err,user)=>{
      if (err) return reject(err);
      resolve(user || null);
    });
  });
}
