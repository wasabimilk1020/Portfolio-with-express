var express = require('express');
const { connect } = require('./topics');
var router = express.Router();

module.exports=function(connection){
  router.get('/signUp',function(req, res){
    res.render('signUp',{linkCss:'/stylesheets/signUp.css'});
  });
  
  router.post('/signUp-process',function(req, res){
    let post = req.body; /* 회원등록에서 보낸 데이터를 받음 */
    connection.query(`insert into register (username, email, password, created) values(?,?, ?,now())`, [post.usr, post.email, post.pwd],function (error, results, fields) {
      if (error) throw error;
      else{
        req.session.is_signed=true;
        req.session.usr_email= post.email;
        req.session.save(function(err){
          res.redirect('/');
        })
      }
    });
  });

  router.get('/signIn',function(req, res){
    var logStat;
    if(req.session.is_signed === undefined || req.session.is_signed===true){
      logStat = '';
    }
    else if(req.session.is_signed === false){
      logStat='아이디 or 비밀번호가 틀렸습니다.';
      req.session.is_signed = undefined;
    }
    console.dir(req.cookies);
    res.render('signIn',{linkCss:'/stylesheets/signIn.css',logFailed:logStat});
  });

  router.post('/signIn-process',function(req, res){
    var post = req.body; //post.email, post.pwd
    connection.query('select * from register where email=? and password=?', [post.email, post.pwd], function (error, results, fields){
      if (error) throw error;
      else if(results.length){
        req.session.is_signed=true;
        req.session.usr_email=post.email;
        req.session.save(function(err){
          res.redirect('/');
        })
      }
      else{
        req.session.is_signed = false;
        req.session.save(function(err){
        res.redirect('/auth/signIn'); 
        })
      }
    });
  });

  router.get('/signOut', function(req, res){
    req.session.destroy(function(err){  //session이 없어지는 거지 cookie가 없어지는게 아님
      res.clearCookie('connect.sid');   //리다이렉션하기 전에 쿠키 없애려고 넣어줌.
      res.redirect('/auth/signIn');
    })
  });

  return router;
} 
//지금은 입력값이 맞던 틀리던 그냥 전송되게 되어있는데 이 form태그 자체에서 유효성 검사를 실시해서 틀린 값일 때 전송 안되게 만들어줘야한다.
//왜냐하면 그냥 아무 값이나 보내고 서버에서 유효성을 검사하게되면 서버에 부하 걸린다.
//근데 여기서 어떤 유효성 검사를 해야되냐 그럼?????? 클라이언트 쪽에서 할 수 있는것 예를들어 아이디가 너무 짧다거나 아예 입력이 되지 않았을경우 등등을 하면된다.
//이렇게만 해줘도 아예 입력 안하고 막 보내는것은 막을수 있으니.....