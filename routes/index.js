var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = function(connection){
  router.get('/', function(req, res, next) {
    if(!req.user){ //to check signIn status
      res.redirect('/auth/signUp');
      return false;
    } 
      res.render('index',{linkCss:'/stylesheets/style.css', username:req.user.username});
  });
  return router;
}



