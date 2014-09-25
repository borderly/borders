var request = require('request');

module.exports = {
  create: function(req, res, next) {
    res.render('create', {title:'create law',message:'Create the law'})
  },
  root: function(req, res, next) {
    res.render('index')
  },
  test: function(req, res, next) {
    res.render('test')
  }
}
