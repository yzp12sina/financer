var express = require('express'),
    app = express();

var financer = express.Router();

financer.use(function(req,res,next){
  console.log('We have a req to app...');
  next();
});

financer.get('/', function (req, res) {
   if(req.session.status=='Authorized')
      res.redirect('/app');
   else
      res.render('index.html',{test:[]});
});

financer.get('/app', function (req, res) {
   if(req.session.status=='Authorized')
      res.render('app.html',{test:[]});
   else res.redirect('/');
});

// app.use('/',financer);

module.exports = financer;
