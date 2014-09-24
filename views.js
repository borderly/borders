module.exports = {
  create: function(req, res, next) {
    res.render('index', {title:'Index',message:'Hi'})
  }
}
