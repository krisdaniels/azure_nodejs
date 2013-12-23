
/*
 * GET home page.
 */


var title = 'House monitor';

exports.index = function(req, res){
  res.render('index', { title: title });
};

exports.actions = function(req, res){
  res.render('actions', { title: title });
};

exports.sensors = function(req, res){
  var sensorName = req.params.sensorName;
  console.log(sensorName);
  res.render('sensor', { title: title, currentSensor: sensorName });
};
