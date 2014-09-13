var restify = require('restify');
var moment = require('moment');

function name(req, res, next) {
  res.send({'hello': req.params.name});
  next();
}

function nameEmpty(req, res, next) {
  res.send({
    'hello':'stranger'
  });
  next();
}

function root(req, res, next) {
  res.send('hello world');
  next();
}

function date(req, res, next) {
  res.send({
    'fancydate':moment().format('MMMM Do YYYY, h:mm:ss a'),
    'date':moment().format('L')
  });
}

function uhoh(req, res, next) {
  res.send({'404':'content not found'})
}

var server = restify.createServer();
server.get('/', root);
server.head('/', root);
server.get('/hello', nameEmpty);
server.head('/hello', nameEmpty);
server.get('/hello/:name', name);
server.head('/hello/:name', name);
server.get('/date', date);
server.head('/date', date);
server.get('/(.*)/', uhoh);
server.head('/(.*)/', uhoh);

server.listen(8080, '0.0.0.0', function() {
  console.log('%s listening at %s', server.name, server.url);
});
