var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var h = require('./handlers');
var l = require('./laws.js');
var v = require('./views.js');
var port = Number(process.env.PORT || 8080);

var app = express();
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

if(app.get('env') === 'development') {
  app.use(logger('dev'));
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.get('/', h.doc);
app.head('/', h.doc);
app.get('/create', v.create);
app.get('/laws', l.listLaws);
app.head('/laws', l.listLaws);
app.get('/laws/:state', l.lawsByState);
app.head('/laws/:state', l.lawsByState);
app.get('/laws/create', l.lawsCreate);
app.head('/laws/create', l.lawsCreate);
app.post('/laws/create', l.lawsCreate);
app.get('/laws/remove/:id', l.lawsRemove);
app.head('/laws/remove/:id', l.lawsRemove);
app.get('/(.*)/', h.uhoh);
app.head('/(.*)/', h.uhoh);

module.exports = app;
