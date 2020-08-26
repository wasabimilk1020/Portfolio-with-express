var express = require('express');
const { v4: uuidv4 } = require('uuid'); //conditional exports warning 뜨는데 이거 나중에 봐보자.
var router = express.Router();

module.exports=function(connection){
  router.post('/signUp-process', function(req, res, next) {
    let user = {
      id:uuidv4(),
      usr:req.body.usr,
      email:req.body.email,
      pwd:req.body.pwd,
    }
    connection.query(`insert into register (id, username, email, password, created) values(?,?,?, ?,now())`, [user.id, user.usr, user.email, user.pwd],function (error, results, fields) {
      //DB에 회원정보 등록
      if (error) throw error;
      else{
        req.login(user, function(err) {
          if (err)
            return next(err);
          req.session.save(function(err){
            if (err)
              return next(err);
            return res.send(req.user); 
          })
        });
      }
    });
  });

return router;
}

