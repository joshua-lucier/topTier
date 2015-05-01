sensor = process.argv[2];
value = process.argv[3];
var request = require('request');
console.log(sensor + " " + value);
request.post(
	'http://localhost:8080',
	{ qs: { 'sensor' : sensor, 'unitvalue' : value}, json: true},
		function(error, response, body)
		{
			if (!error && response.statusCode == 200)
			{
			/*	console.log("Printing Body");
				console.log(body);
				console.log("Printing Response");
				console.log(response);*/
				console.log("complete");
			}
			else if (error)
			{
			/*	console.log("Printing Error");
				console.log(error);
			*/
				console.log(error);
			}
		}
);