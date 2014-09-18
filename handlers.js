var moment = require('moment');
var mongoose = require('mongoose');

module.exports = {
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
