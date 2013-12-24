var sock={};



$( document ).ready(function(){
	console.log('ready');
	
	
	
	if (!window.location.origin)
		window.location.origin = window.location.protocol+"//"+window.location.host;
		var socket = io.connect(window.location.origin);
	  	sock = socket;
		socket.on('update', function (data) {
			console.log(data);
			var data = JSON.parse(data);
		//debugger;
		
			switch(data.response)
			{
					case 'getLastValues':
						updateGraph(data);
						break;
					default:
						updateSensorData(data);
			}
		
			
		
	  });	
	  
	  
	function updateSensorData(data)
	  {
		  if(data.sensorid)
			{
				var id = '#sensor_'+data.sensorid;
				var object = $(id);
				if(object)
				{
					object.text(data.value);
					object.effect("highlight", {}, 3000);
				}
			}
		}
		
		function updateGraph(data)
		{
		
		}
});



