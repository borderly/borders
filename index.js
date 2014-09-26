var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var cors = require('cors');
var h = require('./handlers');
var l = require('./laws.js');
var v = require('./views.js');
var a = require('./app.js');
var port = Number(process.env.PORT || 8080);

var app = express();
var apiRouter = express.Router();
var viewRouter = express.Router();
var appRouter = express.Router();

app.use(favicon(__dirname + '/public/favicon.ico'));
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.use('/api', apiRouter);
app.use('', viewRouter);
app.use('/app', appRouter);

if(app.get('env') === 'development') {
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

apiRouter.get('/', h.doc);
apiRouter.get('/laws', l.listLaws);
apiRouter.head('/laws', l.listLaws);
apiRouter.get('/laws/:state', l.lawsByState);
apiRouter.head('/laws/:state', l.lawsByState);
apiRouter.get('/laws/create', l.lawsCreate);
apiRouter.head('/laws/create', l.lawsCreate);
apiRouter.post('/laws/create', l.lawsCreate);
apiRouter.get('/laws/remove/:id', l.lawsRemove);
apiRouter.head('/laws/remove/:id', l.lawsRemove);

viewRouter.get('/', v.root);
viewRouter.get('/create', v.create);
viewRouter.get('/test', v.test);

appRouter.get('/', a.root);

module.exports = app;
