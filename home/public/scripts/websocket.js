
$( document ).ready(function(){
	console.log('ready');
	/*var connection = new WebSocket('ws://locla');
	
	connection.onopen = function () {
      //connection.send('Ping'); // Send the message 'Ping' to the server
      console.log('connected!!');
    };
    
	connection.onerror = function (error, data) {
	  //debugger;
      console.log('WebSocket Error ' + error);
    };

    // Log messages from the server
    connection.onmessage = function (e) {
      console.log('Server: ' + e.data);
    };
    
    connection.onclose = function(e){
		//debugger;
		console.log(e);
	};*/
	if (!window.location.origin)
		window.location.origin = window.location.protocol+"//"+window.location.host;
	var socket = io.connect(window.location.origin);
	  socket.on('news', function (data) {
		console.log(data);
		socket.emit('my other event', { my: 'data' });
	  });	
	socket.on('update', function (data) {
		console.log(data);
		var data = JSON.parse(data);
		if(data.sensorid==22)
		{
		$('#living_temp').text(data.value);
		$('#living_temp').effect("highlight", {}, 3000);
		}
		
		if(data.sensorid==21)
		{
		$('#living_light').text(data.value);
		$('#living_light').effect("highlight", {}, 3000);
		}
		
		if(data.sensorid==23)
		{
		$('#living_battery').text(data.value);
		$('#living_battery').effect("highlight", {}, 3000);
		}
		
	  });	
});

