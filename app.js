var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mysql = require('mysql');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('connect-flash');
const crypto = require('crypto');

var app = express();

app.use(flash());

//DB (mysql)
// var connection = mysql.createConnection({
//     host     : 'database-1.cs0gqqhuzzsh.ap-northeast-2.rds.amazonaws.com',
//     user     : 'admin',
//     password : 'akdlsql123',
//     database : 'portfolio'
// });
// connection.connect();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'akdlsql123',
  database : 'portfolio'
});
connection.connect();

//session
app.use(session({
  secret: 'asadlfkj!@#!@#dfgasdg',
  resave: false,
  saveUninitialized: false,
  store:new FileStore(),
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//--Sign In Aurhentification (passport.js)--//
var passport = require('./public/javascripts/passport')(app, connection, crypto);
//근데 왜 이때는 public을 쓰지? 정적 파일인데..흠...

//routing
var indexRouter = require('./routes/index');
var topicsRouter = require('./routes/topics');
var authRouter = require('./routes/auth');

app.use('/', indexRouter(connection));
app.use('/topics', topicsRouter);
app.use('/auth',authRouter(connection, passport, crypto));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


//1. 어떻게 구동하는지 다시 한번 봐보고 정리 좀 하자.
//4. db에 들어가는 데이터 암호화 해서 넣어야 되는데 특히 password...
//5. session이 파일 스토어로 되어 있는데 이것도 db로 저장되게 바꿔야함
//6. 로그인후 로그아웃 안하고 페이지 닫고 다시 접속 했을때는 바로 메인 페이지 보이게 하자. (자꾸 에러나서 이게 안되네....)

