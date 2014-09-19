var moment = require('moment');
var mongoose = require('mongoose')
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
  lawsCreate: function(req, res, next) {
    var law = new Law({
      section: req.body.section,
      title:   req.body.title,
      state:   req.body.state.toUpperCase(),
      law:     req.body.law
    });
    law.save(function (err, law) {
      if (err) return console.error(err);
      res.send(law);
    });
  },
  root: function(req, res, next) {
    res.send('hello world');
    next();
  },
  uhoh: function(req, res, next) {
    res.send({'404':'content not found'})
  }
}
