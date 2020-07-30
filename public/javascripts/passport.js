module.exports=function(app, connection){
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  app.use(passport.initialize());
  app.use(passport.session());


  passport.serializeUser(function(user, done) {
    console.log('serialize!');
    done(null, user.id); //이 함수가 req.session=user.id를 넣는듯한데 
                         //이렇게 session객체에 데이터가 들어오면 session미들웨어가 session 스토어에 데이터를 저장해야하는데 이것을 기다리지않고
                         //redirection을 해버리면 deserializeUser가 호출되지 않는 현상이 생김. 
                         //session 스토어에 데이터가 없으면 호출 자체가 안되는듯...
  });

  passport.deserializeUser(function(id, done) {
    console.log('deserialize!!');
    connection.query('select * from register where id=?', [id], function (error, results, fields){
      if (error) throw error;
      else if(results.length){
        done(null, results[0]);
      }
    });
  });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pwd'
  },
    function(email, pwd, done) {
      console.log("LocalStrategy!!");
      console.log('email: '+email);
      console.log('password '+pwd);
      connection.query('select * from register where email=? and password=?', [email, pwd], function (error, results, fields){
        if (error) throw error;
        else if(results.length){
          done(null, results[0]);
        }
        else{
          done(null,false);
        }
      });
    }
  ));
  return passport;
};