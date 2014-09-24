var mongoose = require('mongoose')
if(process.env.NODE_ENV == 'production') {
  mongoose.connect(process.env.MONGOHQ_URL);
} else {
  mongoose.connect('mongodb://localhost/laws');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('[laws] Connected to db');
});

var lawSchema = mongoose.Schema({
  section: {type:String,required:true},
  title:   {type:String,required:true},
  state:   {type:String,required:true},
  county:  {type:String,required:true},
  law:     {type:String,required:true}
}, { versionKey: false });

var Law = mongoose.model('Law', lawSchema);


module.exports = {
  listLaws: function(req, res, next) {
    var limit = req.query.limit || 10;
    Law.find({}).limit(limit).sort({state: 1}).exec(function(err, results){
      if (!err) {
        res.send(results);
      } else {
        res.send(err);
      }
    });
  },
  lawsByState: function(req, res, next) {
    var limit = req.query.limit || 10;
    Law.find({'state': req.params.state.toUpperCase()}).limit(limit).exec(function(err, results){
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
      if (err) return res.send(err);
      res.send(law);
    });
  },
  lawsRemove: function(req, res, next) {
    Law.findById(req.params.id, function(err, doc){
      if(!err) {
        doc.remove();
        res.send({message:'law removed'});
      } else {
        res.send(err);
      }
    });
  }
}
