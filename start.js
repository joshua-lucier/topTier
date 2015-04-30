var http = require('http');
var url = require('url');
var querystring = require('querystring');
var mysql = require('mysql');
connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'pizzamonkey'
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
		console.log(req.param);
		var theUrl = url.parse(req.url);
		var queryObj = querystring.parse(theUrl.query);
		var obj = queryObj;
		console.log(obj);
		var sensor = obj.sensor;
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
		noTouchy();
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