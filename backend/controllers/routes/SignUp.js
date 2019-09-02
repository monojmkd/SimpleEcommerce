const express = require('express');
const con = require('./../../Database/Connection');

var app = new express.Router();

app.post('/users', function (req, res) {
    var sql = "INSERT INTO login_details (first_name, last_name, email, password, created_on, contact, gender) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?)";
    var data = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.password,
        req.body.contact,
        req.body.gender
    ];
    con.query(sql, data, function (err, result) {
        if (!err && result.affectedRows !== 0) {
            res.send({
                success: true
            })
        }
        else {
            res.send({
                success: false
            })
        }
    });

});



module.exports = app;




