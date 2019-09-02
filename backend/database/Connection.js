var mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "ecommerce"
})

connection.connect(err => {
    if (err) {
        throw err;
    }
})
console.log("connection established");
module.exports = connection;
