var restify = require('restify');
var moment = require('moment');

function respond(req, res, next) {
  res.send({'hello': req.params.name});
  next();
}

function root(req, res, next) {
  res.send('hello world');
  next();
}

function date(req, res, next) {
  res.send({'date':moment().format('MMMM Do YYYY, h:mm:ss a')});
}

function uhoh(req, res, next) {
  res.send({'404':'content not found'})
}

var server = restify.createServer();
server.get('/', root);
server.head('/', root);
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);
server.get('/date', date);
server.head('/date', date);
server.get('/(.*)/', uhoh);
server.head('/(.*)/', uhoh);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
