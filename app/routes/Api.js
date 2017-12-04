var express = require('express'),
    app = express(),
    bcrypt = require('bcrypt'),
    session = require('express-session'),
    flash = require('req-flash');


var Session = require('../models/User'),
    User = require('../models/User'),
    Income = require('../models/Income'),
    Outcome = require('../models/Outcome');

var api = express.Router();

api.use(function(req,res,next){
  console.log('We have a req to API...');
  next();
});

/*ROUTES========================*/
api.get('/',function(req,res){
  res.render('api.html');
});

/* -> signup */
api.post('/signup',function(req,res){
  User.findOne({email : req.body.email}, function(err, user){
    if(!user){
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        var user = new User();

        user.name = req.body.name;
        user.email = req.body.email;
        user.password = hash;
        user.created_at = Date.now();
        user.updated_at = Date.now();

        user.save(function(error){
          if(error)
              var response = {
                 status : 500 ,
                 message : "Error while save user"
              };
          else
              var response = {
                 status : 200,
                 data : user,
                 message : "User saved!"
              };
          res.json(response);
        });
      });
    }else{
      res.json({
         status : 500,
         message : "User already exists"
      });
    }
  });
});
api.get('/signup', function(req,res){
  res.json({
    status:404,
    message:"use post instead"
  });
});

//LOGIN
api.post('/login', function(req,res){
  console.log(res);
   var _res = res;
   User.findOne({email : req.body.email}, function(err, user){
      if(user){
         bcrypt.compare(req.body.password, user.password, function(err, res) {
            if(res){
               req.session.status = 'Authorized';
               req.session.data = user;
               var auth = (new Date()).valueOf().toString()+Math.random().toString();
               bcrypt.hash(auth, 2).then(function(auth){
                  var expires = 24 * 3600 * 1000; //1 day
                   req.session.cookie.expires = new Date(Date.now() + expires);
                   req.session.cookie.maxAge = expires;
                  req.session.auth = auth;
                  req.session.save();
                  _res.json(req.session);
               });
            }else{
               req.session = undefined;
               _res.json({ status : 401, message : "Password doesn't match" });
            }
         });
      }else{
         _res.json({ status : 404, message : "User not found" });
      }
   });
});
api.get('/login', function(req,res){
  res.json({
    status:404,
    message:"use post instead"
  });
});

api.get('/logoff', function(req,res){
  req.session.destroy();
  res.json({
    status : 200,
    message : "logoff"
  })
});

api.get('/user/', function(req,res){
     User.find(function(err, user){
      if(err)
        res.json({ message : 'Erro ao mostrar usuários' });
      res.json(user);
    });
    // User.remove({},function(){});
    // res.json({ message : "This is not the right way. Access /api/ to see documentation"});
});
api.get('/session/', function(req,res){
   res.json(req.session);
});

module.exports = api;
