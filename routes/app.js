var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Law = mongoose.model('Law')

router.get('/', function(req, res, next) {
  Law.find({}).sort({state: 1}).exec(function(err, results){
    console.log(results)
    res.render('app/index', {
      pageTitle: 'Law index',
      laws: results
    });
  })
});

router.get('/test', function(req, res, next) {
  res.send('you have reached the app, pls go away <img src="http://4.bp.blogspot.com/_D_Z-D2tzi14/S8TRIo4br3I/AAAAAAAACv4/Zh7_GcMlRKo/s1600/ALOT.png">');
});

router.get('/law/:id', function(req, res, next) {
  Law.findById(req.params.id, function(err, doc) {
    res.render('app/law', {
      pageTitle: 'Law listing',
      law: doc
    })
  });
});

router.use(function(req, res, next){
  res.status(404);
  res.render('404', { url: req.originalUrl, title: req.url + ' - Not found', laws: true});
});

module.exports = router;
