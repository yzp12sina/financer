//SERVER PORT
var port = 3006;
//REQUIRES
var express = require('express');
var app = express();
var engine = require('ejs');
var mongoose = require('mongoose');
var bodyParser= require('body-parser');

var User = require('./models/User');

//setting bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//setting database
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/', { useMongoClient: true });
mongoose.Promise = global.Promise;
var UsersSchema = new Schema({
  name: String,
  email: String
});


//setting routes
var api = express.Router();
var financer = express.Router();


//setting ejs to render html files
app.engine('html', engine.renderFile);
//setting views dir
app.set('views', './dist/');
//setting static content
app.use("/css", express.static('../dist/css'));
app.use("/js", express.static('../dist/js'));


//setting default api
app.use('/api',api);
app.use('/',financer);

/*=====ROUTES======*/
  financer.get('/', function (req, res) {
    res.render('index.html',{test:[]});
  });
  //API ROUTES
    //VIEWS ROUTES
    api.route('/')
      .get(function(req,res){
        res.json({message:'API FINANCER'});
      });

    //user routes
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

//start server
app.listen(port, ()=>{
  console.log('Server running on port ' + port +'...');
});
