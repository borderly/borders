var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var logger = require('morgan');
var h = require('./handlers');
var l = require('./laws.js');
var port = Number(process.env.PORT || 8080);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.use(logger('combined'));

app.get('/', h.root);
app.head('/', h.root);
app.get('/laws', l.listLaws);
app.head('/laws', l.listLaws);
app.get('/laws/:state', l.lawsByState);
app.head('/laws/:state', l.lawsByState);
app.get('/laws/create', l.lawsCreate);
app.head('/laws/create', l.lawsCreate);
app.post('/laws/create', l.lawsCreate);
app.get('/laws/remove/:id', l.lawsRemove);
app.head('/laws/remove/:id', l.lawsRemove);
app.get('/loaderio-d6800512a9c950194f6210dca6b7405f', function(req, res, next){
  res.send('loaderio-d6800512a9c950194f6210dca6b7405f')
  next();
});
app.get('/(.*)/', h.uhoh);
app.head('/(.*)/', h.uhoh);

app.listen(port, function(){
  console.log('server running on port: %d', port);
});
