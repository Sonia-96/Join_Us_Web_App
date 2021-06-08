const mysql = require('mysql');
const faker = require('faker');
const DB_PASSWORD = require('./ps');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: DB_PASSWORD,
    database: 'join_us',
    port: 3306
});

// user faker to randomly generate 500+ data
const data = [];
for (let i = 0; i < 528; i++) {
    const randomEmail = faker.internet.email();
    const time = faker.date.past();
    data.push([randomEmail, time]);
}

const q = "INSERT INTO users (email, created_at) VALUES ?";
connection.query(q, [data], (error, results) => {
    if (error) throw error;
})

connection.end();