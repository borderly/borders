var moment = require('moment');
var mongoose = require('mongoose')
mongoose.connect('mongodb://heroku:6mOFBgo8Z5CAjZitQeDBmIZjaWbvtAdpKgUt-tZXgyzM5tAhxHvoz1r4jJF-iIEPPS_CKYlzif9BUCBA_7GYFg@kahana.mongohq.com:10006/app29698871')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Connected to db');
});

var lawSchema = mongoose.Schema({
  section: String,
  title:   String,
  state:   String,
  law:     String
});

var Law = mongoose.model('Law', lawSchema);
var laws = Law.findOne();
console.log(laws);

module.exports = {
  laws: function(req, res, next) {
    var laws = Law.findOne();
    res.send(laws);
    consle.log(laws);
  },
  name: function(req, res, next) {
    res.send({'hello': req.params.name});
    next();
  },
  nameEmpty: function(req, res, next) {
    res.send({
      'hello':'stranger'
    });
    next();
  },
  root: function(req, res, next) {
    res.send('hello world');
    next();
  },
  date: function(req, res, next) {
    res.send({
      'fancydate':moment().format('MMMM Do YYYY, h:mm:ss a'),
      'date':moment().format('L')
    });
  },
  uhoh: function(req, res, next) {
    res.send({'404':'content not found'})
  }
}
