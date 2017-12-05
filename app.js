var express = require('express'),
    app = express(),
    engine = require('ejs'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    session  = require('express-session');

//models
var Session = require('./app/models/User'),
    User = require('./app/models/User'),
    Income = require('./app/models/Income'),
    Outcome = require('./app/models/Outcome');

//routes
var api = require('./app/routes/Api'),
    financer = require('./app/routes/Financer');

//setting bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//setting Session
app.use(session({ secret : "financeristhebest", resave : false, saveUninitialized : true }));

//setting database
mongoose.connect('mongodb://localhost:27017/', { useMongoClient: true }, function(err){
    if(err) console.log('Error do connect database...'); else console.log('Connected to database...');
});
mongoose.Promise = global.Promise;

//setting ejs to render html files
app.engine('html', engine.renderFile);

//setting views dir and static content
app.set('views', './public/');
app.use("/css", express.static('./public/css'));
app.use("/js", express.static('./public/js'));

//setting ROUTES
app.use('/api',api);
app.use('/',financer);

//start server
app.listen(process.env.PORT || 8000, ()=>{
  console.log('Server running...');
});
