module.exports = {
  create: function(req, res, next) {
    res.render('index', {title:'create law',message:'Create the law'})
  }
}
