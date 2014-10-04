var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Law = mongoose.model('Law')

router.get('/', function(req, res, next) {
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

router.get('/laws', function(req, res, next) {
  var limit = req.query.limit || 50;
  Law.find({}).limit(limit).sort({state: 1}).exec(function(err, results){
    if (!err) {
      res.jsonp(results);
    } else {
      res.jsonp(err);
    }
  });
});

router.get('/laws/:state', function(req, res, next) {
  var limit = req.query.limit || 10;
  Law.find({'state': req.params.state.toUpperCase()}).limit(limit).exec(function(err, results){
    if(!err) {
      res.jsonp(results);
    } else {
      res.jsonp(err);
    }
  });
});

router.post('/laws/create', function(req, res, next) {
  var law = new Law({
    section: req.body.section,
    title:   req.body.title,
    state:   req.body.state.toUpperCase(),
    county:  req.body.county,
    law:     req.body.law
  });
  law.save(function (err, law) {
    if (err) return res.jsonp(err);
    res.jsonp(law);
  });
});

router.get('/laws/remove/:id', function(req, res, next) {
  Law.findById(req.params.id, function(err, doc){
    if(!err) {
      doc.remove();
      res.jsonp({message:'law removed'});
    } else {
      res.jsonp(err);
    }
  });
});

router.get('/laws/render/:id', function(req, res, next) {
  Law.findById(req.params.id, function(err, doc) {
    res.render('app/law', doc)
  })
});

router.use(function(req, res, next){
  res.status(404);
  res.jsonp({ 404: 'Not found' });
});

module.exports = router, Law;
