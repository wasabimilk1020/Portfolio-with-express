var express = require('express');
const { connect } = require('./topics');
var router = express.Router();

module.exports=function(connection, passport){
  router.get('/signUp',function(req, res){
    res.render('signUp',{linkCss:'/stylesheets/signUp.css'});
  });
  
  router.post('/signUp-process',function(req, res){
    let post = req.body; /* 회원등록에서 보낸 데이터를 받음 */
    connection.query(`insert into register (username, email, password, created) values(?,?, ?,now())`, [post.usr, post.email, post.pwd],function (error, results, fields) {
      if (error) throw error;
      else{
        connection.query('select * from register where email=? and password=?', [post.email, post.pwd], function (error, results, fields) {
          req.login(results[0], function(err) {
            if (err)
              return next(err);
            req.session.save(function(err){
              if (err)
                return next(err);
              return res.redirect('/');
            })
          });
        });
      }
    });
  });

  router.get('/signIn',function(req, res){
    //세션에 flash가 존재하면 (이 로직이 맞는지는 모르겠는데 일단 된다;;)
    var errMsg = req.flash(); //session에 flash객체가 무조건 생김 전달한게 없어도 빈 객체로 생성된다.
    console.log('errMsg '+errMsg);
    if(!errMsg.noEmail){
      errMsg.noEmail= [];
      errMsg.noEmail[0]='';
    }
    if(!errMsg.noPwd){
      errMsg.noPwd= [];
      errMsg.noPwd[0]='';
    }
    if(!errMsg.error){
      errMsg.error= [];
      errMsg.error[0]='';
    }
    
    res.render('signIn',{linkCss:'/stylesheets/signIn.css', noInputMsg:errMsg, invalMsg:errMsg});
  });
  
  router.post('/signIn-process', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      //req.body안의 데이터가 없으면 인증을 하는 곳으로 가지도 않는다.
      if (err) {
        return next(err);
      }
      else if (!user) {
        //to make flash message for invalid or no inputs
        if(req.body.email =='' || req.body.pwd ==''){
          if(req.body.email =='')
            req.flash('noEmail','No Input');
          if(req.body.pwd =='')
            req.flash('noPwd','No Input');
        }
        else{
          req.flash('error', '아이디 혹은 비밀번호가 잘못되었습니다.');
        }
        //session에 데이터 저장하는 작업이 있으면 아래 함수를 꼭 호출해줘야 한다.
        req.session.save(function(err){
          if(err)
            return next(err);
          else{
            return res.redirect('/auth/signIn'); //리다이렉트 하려면 return을 하도록 공식문서에 되어있네..
          }
        });
      }
      else{
        req.login(user, function (err) {
          if (err) {
            return next(err);
          }

          //serialize 호출되고 세션 스토어에 완전히 데이터가 저장되야지
          //deserialize가 세션 스토어의 데이터에 접속가능하면 호출이된다.
          //만약 세션 스토어에 데이터가 없으면 deserialize는 호출되지 않음.
          return req.session.save(function (err) {
            if (err) {
              return next(err);
            }
            return res.redirect('/');
          });
        });
      }
      
    })(req, res, next);
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

