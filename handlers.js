module.exports = {
  root: function(req, res, next) {
    res.send('hello world');
    next();
  },
  uhoh: function(req, res, next) {
    res.send({'404':'content not found'})
  }
}
