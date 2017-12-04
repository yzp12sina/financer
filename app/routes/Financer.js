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
  res.render('app.html',{test:[]});
});

// app.use('/',financer);

module.exports = financer;
