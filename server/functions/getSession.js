function getSession(user,models){
  const {Session} = models;
  return new Promise((resolve,reject)=>{
    Session.findOne({owner:user.username},(err,session)=>{
      if (err) return reject(err);
      if (session) return resolve(session);
      let newSession = new Session({owner:user.username});
      newSession.save(err=>{
        if (err) return reject(err);
        resolve(newSession);
      });
    });
  });
}
module.exports = getSession;
