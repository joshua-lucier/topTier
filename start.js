var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var mysql = require('mysql');
eval(fs.readFileSync('config.js')+'');
connection = mysql.createConnection({
	host : HOST,
	user : USER,
	password : PASSWORD
})

function noTouchy()
{
	console.log("NoTouchy");
}

connection.connect();

connection.query('use topTier;', function(err, rows, fields)
	{
		if(err) throw err;
		console.log("Accessed Database");
	});

const PORT=8080;

var server = http.createServer(
	function(req, res){
		console.log(req.url);
		var theUrl = url.parse(req.url);
		var queryObj = querystring.parse(theUrl.query);
		var obj = queryObj;
		try
		{
			var sensor = obj.sensor;
			if(obj.unitvalue) 
			{
				var unitvalue = obj.unitvalue;
				var queryLogString = "insert into inputlog (SENSOR,VALUE) values('"+sensor+"','"+unitvalue+"');";
				try
				{
					connection.query(queryLogString,  function(err, rows, fields)
					{
						if(err) throw err;
						console.log("Logged");
					});
				}
				catch(e)
				{
					console.log("query failed");
				}
			}
		}
		catch(e)
		{
			console.log("no valid data");
		}
		//noTouchy();
		res.end();
		/*var body ='';
		req.on('data', function(data){
			body += data;
			console.log("Partial body: " + body);
		});
		req.on('end', function(){
			console.log("Body: " + body);
		});
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end('post received');
		*/
});


server.listen(PORT, function(){
	console.log("Server listening on %s", PORT);
});