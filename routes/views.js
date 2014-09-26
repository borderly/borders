var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/create', function(req, res, next) {
  res.render('create', {title:'create law',message:'Create the law'});
})

module.exports = router;
