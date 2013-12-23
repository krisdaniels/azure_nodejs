
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mqtt = require('mqtt');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/actions', routes.actions);
app.get('/sensors/:sensorName', routes.sensors);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var mqttConnected =false;
var mqttConnecting = false;
var client={};

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
	sock = socket;
	
	if(!mqttConnected && !mqttConnecting)
	{
		mqttConnecting=true;
		connectmqtt();
		mqttConnecting=false;
	}
	
	socket.on('disconnect', function(socket){
	if(mqttConnected &&  io.sockets.clients().length == 1)
	{
		mqttConnected = false;
		client.end();
	}
	});
	
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
  });
});


function connectmqtt()
{

var mqttUser = process.env.mqtt_user;
var mqttPassword = process.env.mqtt_password;
var mqttHost = process.env.mqtt_host;
var mqttPort = process.env.mqtt_port;

client = mqtt.createClient(mqttPort, mqttHost, {username: mqttUser, password: mqttPassword});
mqttConnected=true;
client.subscribe('/sensors/#');

client.on('message', function (topic, message) {
  try{io.sockets.emit('update', message);} catch(e){}
});	

}


