module.exports = {
  create: function(req, res, next) {
    res.render('create', {title:'create law',message:'Create the law'})
  }
}
