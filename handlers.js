module.exports = {
  root: function(req, res, next) {
    res.send({message:'This is the borderly api'})
    next();
  },
  uhoh: function(req, res, next) {
    res.send({'404':'content not found'})
  }
}
