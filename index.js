var restify = require('restify');
var h = require('./handlers');
var port = Number(process.env.PORT || 8080);

var server = restify.createServer({
  name: 'API'
});
server.use(restify.bodyParser());
server.use(restify.CORS());
server.use(restify.fullResponse());

server.get('/', h.root);
server.head('/', h.root);
server.get('/laws', h.laws);
server.head('/laws', h.laws);
server.get('/hello', h.nameEmpty);
server.head('/hello', h.nameEmpty);
server.get('/hello/:name', h.name);
server.head('/hello/:name', h.name);
server.get('/date', h.date);
server.head('/date', h.date);
server.get('/(.*)/', h.uhoh);
server.head('/(.*)/', h.uhoh);

server.listen(port, '0.0.0.0', function() {
  console.log('%s listening at %s', server.name, server.url);
});
