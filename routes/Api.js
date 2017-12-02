var express = require('express');
var app = express();

var api = express.Router();

api.use(function(req,res,next){
  console.log('We have a req to API...');
  next();
});
// app.use('/api',api);

api.route('/')
  .get(function(req,res){
    res.json({message:'API FINANCER'});
  });

api.route('/user')
  .post(function(req,res){
    var user = new User();
    user.name = req.body.name;

    user.save(function(error){
      if(error)
        res.send('Erro ao tentar salvar usuário: ' + error);

      res.json({message:'User created'});
    })
  });

module.exports = api;
