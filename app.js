const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const app = express();
const DB_PASSWORD = require('./ps');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname +'/public'));
app.use(bodyParser.urlencoded({extended: true}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: DB_PASSWORD,
    database: 'join_us',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("MySQL Connected!");
    }
})

app.get('/', (req, res) => {
    const q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, (error, results) => {
        if (error) throw error;
        const count = results[0].count;
        res.render('home', {count: count});
    })
})

app.post('/register', (req, res) => {
    const person = {email: req.body.email};
    const q = `INSERT INTO users SET ?`;
    connection.query(q, person, (error, results) => {
        if (error) throw error;
        res.redirect('/');
    })
})

const port = process.env.PORT || 8080;
app.listen(port, (req, res) => {
    console.log(`Serving on localhost: ${port}!`);
})
