var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('you have reached the app, pls go away <img src="http://4.bp.blogspot.com/_D_Z-D2tzi14/S8TRIo4br3I/AAAAAAAACv4/Zh7_GcMlRKo/s1600/ALOT.png">');
});

router.get('/test', function(req, res, next) {
  res.render('app/index');
});

module.exports = router;
