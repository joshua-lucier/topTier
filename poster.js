var request = require('request');

request.post(
	'http://localhost:8080',
	{ qs: { 'key' :'dude', 'nonsense' : 'Here we go'}, json: true},
		function(error, response, body)
		{
			if (!error && response.statusCode == 200)
			{
				console.log("Printing Body");
				console.log(body);
				console.log("Printing Response");
				console.log(response);
			}
			else if (error)
			{
				console.log("Printing Error");
				console.log(error);
			}
		}
);