var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var cors = require('cors');
var lawRoutes = require('./routes/laws');
var viewRoutes = require('./routes/views');
var appRoutes = require('./routes/app');
var port = Number(process.env.PORT || 8080);

var app = express();

app.use(favicon(__dirname + '/public/favicon.ico'));
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use('/api', lawRoutes);
app.use('', viewRoutes);
app.use('/app', appRoutes);

if(process.env.NODE_ENV === 'development') {
  app.locals.pretty = true;
  app.use(logger('dev'));
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(req, res, next){
  res.status(404);
  if (req.accepts('html')) {
    res.render('404', { url: req.url, title: req.url + ' - Not found' });
    return;
  }
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  res.type('txt').send('Not found');
});

module.exports = app;
