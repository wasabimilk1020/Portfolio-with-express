var express = require('express');
const { connect } = require('./topics');
const { v4: uuidv4 } = require('uuid'); //conditional exports warning 뜨는데 이거 나중에 봐보자.
var router = express.Router();

module.exports=function(connection, passport, crypto){
  router.get('/signUp',function(req, res){
    let errMsg = req.flash()
    res.render('signUp',{linkCss:'/stylesheets/signUp.css', errMsg:errMsg.error});
  });
  
  router.post('/signUp-process',function(req, res){ 
    let post = req.body; /* 회원등록에서 보낸 데이터를 받음 */

    //hashing pwd
    const hash = crypto.createHash('sha256');
    hash.update(req.body.pwd);
    let pwd = hash.digest('hex');

    let user ={
      id:uuidv4(),
      usr:req.body.usr,
      email:req.body.email,
      pwd:pwd,
    }
    connection.query('select * from register where email=?', [user.email], function (error, results, fields){
      //아이디 중복 체크
      if (error) throw error;
      else if (results.length){
        req.flash('error', '중복된 아이디입니다.');
        return res.redirect('/');
      }
      else{
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
                return res.redirect('/');
              })
            });
          }
        });
      }
    })
  });

  router.get('/signIn',function(req, res){
    //세션에 flash가 존재하면 (이 로직이 맞는지는 모르겠는데 일단 된다;;)
    var errMsg = req.flash(); //session에 flash객체가 무조건 생김. 전달한게 없어도 빈 객체로 생성된다.
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
      //req.body안의 데이터가 없으면 인증을 하는 곳으로 가지도 않는다. (이게 무슨 소리지??)
      if (err) {
        return next(err);
      }
      else if (!user) {
        req.flash('error', '아이디 혹은 비밀번호가 잘못되었습니다.');
        
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
  
  //여기 passprot로 바꿔야 한다.
  router.get('/signOut', function(req, res){
    req.session.destroy(function(err){  //session이 없어지는 거지 cookie가 없어지는게 아님
      res.clearCookie('connect.sid');   //리다이렉션하기 전에 쿠키 없애려고 넣어줌.
      res.redirect('/auth/signUp');
    })
  });

  return router;
} 

// 1. 회원탈퇴
// 2. 비민번호 변경
// 3. 비밀번호 아이디 찾기 기능
// 4. salt값도 넣어주는데 어떤 식으로 넣어 줘야 할지 공부해보자
// 5. 비민번호 더블 체크하도록 해줘야 한다.
// 6. pbkdf2 가 뭔지 알아보자.
