var restify = require('restify');
var h = require('./handlers');
var l = require('./laws.js');
var port = Number(process.env.PORT || 8080);

var server = restify.createServer({
  name: 'borderly-api'
});
server.use(restify.bodyParser());
server.use(restify.CORS());
server.use(restify.fullResponse());

server.get('/', h.root);
server.head('/', h.root);
server.get('/laws', l.listLaws);
server.head('/laws', l.listLaws);
server.get('/laws/:state', l.lawsByState);
server.head('/laws/:state', l.lawsByState);
server.get('/laws/create', l.lawsCreate);
server.head('/laws/create', l.lawsCreate);
server.post('/laws/create', l.lawsCreate);
server.get('/laws/remove/:id', l.lawsRemove);
server.head('/laws/remove/:id', l.lawsRemove);
server.get('/(.*)/', h.uhoh);
server.head('/(.*)/', h.uhoh);

server.listen(port, '0.0.0.0', function() {
  console.log('%s listening at %s', server.name, server.url);
});
