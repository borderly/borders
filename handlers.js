var moment = require('moment');
var mongoose = require('mongoose')
// mongoose.connect('mongodb://heroku:6mOFBgo8Z5CAjZitQeDBmIZjaWbvtAdpKgUt-tZXgyzM5tAhxHvoz1r4jJF-iIEPPS_CKYlzif9BUCBA_7GYFg@kahana.mongohq.com:10006/app29698871')
mongoose.connect('mongodb://law:'+process.env.MONGO_PASS+'@proximus.modulusmongo.net:27017/weQaxo3t')

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
}, { versionKey: false });

var Law = mongoose.model('Law', lawSchema);
var laws = Law.findOne();
console.log(laws);

module.exports = {
  laws: function(req, res, next) {
    Law.find({}).exec(function(err, results){
      if (!err) {
        res.send(results);
      } else {
        res.send(err);
      }
    });
  },
  lawsByState: function(req, res, next) {
    Law.find({'state': req.params.state.toUpperCase()}).exec(function(err, results){
      if(!err) {
        res.send(results);
      } else {
        res.send(err);
      }
    });
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
