var express = require('express');
var app = express();

var financer = express.Router();

financer.use(function(req,res,next){
  console.log('We have a req to app...');
  next();
});

financer.get('/', function (req, res) {
  res.render('index.html',{test:[]});
});

// app.use('/',financer);

module.exports = financer;
