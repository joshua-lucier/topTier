var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'pizzamonkey'
})

connection.connect();

/*
connection.query('drop database topTier if exists;', function(err, rows, fields)
	{
		if(err) throw err;
		console.log('The solution is: ', rows[0].solution);
	});
*/

connection.query('use topTier;', function(err, rows, fields)
	{
		if(err) throw err;
		console.log("Accessed Database");
	});
connection.query('drop table if exists inputlog;', function(err, rows, fields)
	{
		if(err) throw err;
		console.log("Cleared Table");
	});
connection.query('create table inputlog(id INT PRIMARY KEY AUTO_INCREMENT, SENSOR STRING, VALUE INT, STAMP DATETIME;', function(err, rows, fields)
	{
		if(err) throw err;
		console.log("Created Table");
	});
connection.end();