var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'join_us'
});

app.get("/", function(req, res){
	// Find count of users in the database
	// Respond with that count
	var q = "SELECT COUNT(*) AS count FROM users";
	connection.query(q, function(error, results){
		if (error) throw error;
		var count = results[0].count;
		res.render("home", {count: count});
	});
});

app.post("/register", function(req, res){
	var person = {email: req.body.email};
	var q = 'INSERT INTO users SET ?';
	connection.query(q, person, function(error, result){
		if (error) throw error;
		res.redirect("/");
	});
	
});

app.listen(3000, function(){
	console.log("Server running on 3000!");
});

