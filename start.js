var http = require('http');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'pizzamonkey'
})

connection.connect();

const PORT=8080;


function handleRequest(request, response)
{
	response.end('It Works!!! Path Hit: ' + request.url);
}

var server = http.createServer(handleRequest);


server.listen(PORT, function(){
	console.log("Server listening on %s", PORT);
});