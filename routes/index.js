var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = function(connection){
  router.get('/', function(req, res, next) {
    console.log('req.user '+req.user);
    if(!req.user){ //to check signIn status
      res.redirect('/auth/signUp');
      return false;
    } 
    connection.query('select username from register where email=?', [req.user.email], function (error, results, fields){
      let usr;
      if (error) throw error;
      else{
        usr = results[0].username;
        res.render('index',{linkCss:'/stylesheets/style.css', username:usr});
      }
    });
  });

  return router;
}



