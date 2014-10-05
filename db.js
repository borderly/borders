var mongoose = require('mongoose');
var shortId = require('shortid');
var Schema = mongoose.Schema;

if(process.env.NODE_ENV == 'production') {
  mongoose.connect(process.env.MONGOHQ_URL);
} else {
  mongoose.connect('mongodb://localhost/laws');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('[db.js] Connected to db');
});

var lawSchema = Schema({
  section: {type:String,required:true},
  title:   {type:String,required:true},
  state:   {type:String,required:true},
  county:  {type:String,required:true},
  law:     {type:String,required:true},
  _id:     {type: String,unique: true,'default': shortId.generate}
}, { versionKey: false });

mongoose.model('Law', lawSchema);
