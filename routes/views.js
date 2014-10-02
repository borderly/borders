var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/create', function(req, res, next) {
  res.render('create', {title:'create law',message:'Create the law'});
})

app.use(function(req, res, next){
  res.status(404);
  res.render('404', { url: req.url, title: req.url + ' - Not found' });
});

module.exports = router;
