var express = require('express');
var router = express.Router();

/* GET topics listing. */
router.get('/skills', function(req, res, next) {
  res.render('skills',{linkCss:'/stylesheets/skills.css'});
});
router.get('/projects',function(req,res){
  res.render('projects',{linkCss:'/stylesheets/projects.css'});
});
module.exports = router;


// router.get('/signUp',function(req, res){
//   res.render('signUp',{linkCss:'/stylesheets/signUp.css'});
// });