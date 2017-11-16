//requires for server work, already setting at package.json file as dependencies
const express = require('express');
const engine = require('ejs');
const MongoClient = require('mongodb').MongoClient
const app = express();
__dirname = '../';
//to set a static content
// app.use(express.static('../dist'));

//setting ejs to render html files
app.engine('html', engine.renderFile);
//setting views dir
app.set('views', '../dist/');
//setting static content
app.use("/css", express.static('../dist/css'));
app.use("/js", express.static('../dist/js'));
//routes
app.get('/', function (req, res) {
  res.render('index.html');
});
app.get('/home', function (req, res) {
  res.end('Hello world');
});

//start server at localhost on 3006 port
// MongoClient.connect('mongodb://<teste>:<teste>@ds259865.mlab.com:59865/financer', (err, database) => {
//   if (err) return console.log(err)
//   db = database
  app.listen(3006, function () {
    console.log('Financer is now running at port 3006...');
  });
// });
