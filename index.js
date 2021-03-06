require('./lib/db');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var cors = require('cors');
var lawRoutes = require('./routes/laws');
var viewRoutes = require('./routes/views');
var appRoutes = require('./routes/app');

var app = express();

app.use(require("connect-assets")());
app.use(favicon(__dirname + '/assets/favicon.ico'));
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use('/api', lawRoutes);
app.use('/a(pp)?', appRoutes);
app.use('', viewRoutes);
app.set('json spaces', 2);
app.set('jsonp callback name', 'cb');
app.locals.pretty = true;

if(process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


module.exports = app;
