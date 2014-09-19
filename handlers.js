module.exports = {
  root: function(req, res, next) {
    res.redirect('http://google.com');
    next();
  },
  uhoh: function(req, res, next) {
    res.send({'404':'content not found'})
  }
}
