module.exports = {
  root: function(req, res, next) {
    res.send({message:'This is the borderly api'});
    next();
  },
  uhoh: function(req, res, next) {
    res.send({'404':'content not found'});
    next();
  },
  doc: function(req, res, next) {
    res.send({
      message:'This is the borderly API',
      routes: {
        laws: {
          example: '/laws',
          urlparams: '?limit=n',
          doc: 'n is any number, defaults to 10 if not specified'
        }
      }
    });
  }
}
