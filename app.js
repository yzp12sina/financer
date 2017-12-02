//SERVER PORT
var port = process.env.port || 3006;

var express = require('express');
var app = express();
var engine = require('ejs');
var mongoose = require('mongoose');
var bodyParser= require('body-parser');

//models
var User = require('./models/User');

//routes
var api = require('./routes/Api');
var financer = require('./routes/Financer');

//setting bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//setting database
mongoose.connect('mongodb://localhost:27017/', { useMongoClient: true });
mongoose.Promise = global.Promise;

//setting ejs to render html files
app.engine('html', engine.renderFile);

//setting views dir
app.set('views', './dist/');

//setting static content
app.use("/css", express.static('../dist/css'));
app.use("/js", express.static('../dist/js'));

//setting ROUTES
app.use('/api',api);
app.use('/',financer);

//start server
app.listen(port, ()=>{
  console.log('Server running on port ' + port +'...');
});
