var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Law = mongoose.model('Law');

router.get('/', function(req, res) {
  res.jsonp({
    message:'This is the borderly API',
    routes: {
      laws: {
        example: '/laws',
        urlparams: '?limit=n',
        doc: 'n is any number, defaults to 50 if not specified'
      }
    },
    dataTypes: {
      json: {
        desc: 'standard json',
        default: true
      },
      jsonp: {
        desc: 'json with a callback',
        callback: '?cb=<callback name>'
      }
    }
  });
});

router.get('/laws', function(req, res) {
  var limit = req.query.limit || 50;
  Law.find({}).limit(limit).sort({state: 1}).exec(function(err, results){
    if (!err) {
      res.jsonp(results);
    } else {
      res.jsonp(err);
    }
  });
});

router.get('/laws/:state', function(req, res) {
  var limit = req.query.limit || 50;
  Law.find({'state': req.params.state.toUpperCase()}).limit(limit).exec(function(err, results){
    if(!err) {
      res.jsonp(results);
    } else {
      res.jsonp(err);
    }
  });
});

router.post('/laws/c', function(req, res) {
  var law = new Law({
    section: req.body.section,
    title:   req.body.title,
    state:   req.body.state.toUpperCase(),
    county:  req.body.county,
    law:     req.body.law
  });
  law.save(function (err, law) {
    if(err){
      res.jsonp(err);
    }
    res.jsonp(law);
  });
});

router.get('/laws/r/:id', function(req, res) {
  Law.findById(req.params.id, function(err, doc){
    if(!err) {
      doc.remove();
      res.jsonp({message:'law removed'});
    } else {
      res.jsonp(err);
    }
  });
});

router.put('/laws/u/:id', function(req, res) {
  Law.findById(req.params.id, function(err, law){
    if(err) {
      res.jsonp(err);
    }
    if(req.body.section !== null) {
      law.section = req.body.section;
    }
    if(req.body.title !== null) {
      law.title = req.body.title;
    }
    if(req.body.state !== null) {
      law.state = req.body.state.toUpperCase();
    }
    if(req.body.county !== null) {
      law.county = req.body.county;
    }
    if(req.body.law !== null) {
      law.law = req.body.law;
    }
    law.save(function(err, law) {
      if(err) return res.jsonp(err);
      res.jsonp(law);
    });
  });
});

router.use(function(req, res){
  res.status(404);
  res.jsonp({ 404: 'Not found' });
});

module.exports = router;
