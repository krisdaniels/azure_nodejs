
/*
 * GET home page.
 */

var bla = process.env.api_username;

exports.index = function(req, res){
  res.render('index', { title: 'Express', username: bla });
};
