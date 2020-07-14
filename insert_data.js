var mysql = require('mysql');
var faker = require('faker');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'join_us'
});


// Use Faker to randomly generate 500+ users 
var data = [];
for(var i = 0; i < 526; i++){
	data.push([
		faker.internet.email(),
		faker.date.past()
	]);
};

// INSERT the data into the database
var q = 'INSERT INTO users (email, created_at) VALUES ?';
connection.query(q, [data], function(error, result){
	console.log(error);
	console.log(result);
})

connection.end();