
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express', username: app.settings.api_username });
};
