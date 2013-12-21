
/*
 * GET home page.
 */

var bla = process.env.api_username;

exports.index = function(req, res){
  res.render('index', { title: 'Express', username: bla });
};

exports.actions = function(req, res){
  res.render('actions', { });
};

exports.sensors = function(req, res){
  var sensorName = req.params.sensorName;
  console.log(sensorName);
  res.render('sensor', { currentSensor: sensorName });
};
