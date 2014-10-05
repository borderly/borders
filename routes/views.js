var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/create', function(req, res) {
  res.render('create', {title:'create law',message:'Create the law'});
});

router.use(function(req, res){
  res.status(404);
  res.render('404', { url: req.url, title: req.url + ' - Not found' });
});

module.exports = router;
