const express = require('express');
const con = require('./../../database/Connection');

var app = new express.Router();

app.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if (email && password) {
        con.query("SELECT user_id FROM login_details WHERE email = ? AND password = ?", [email, password], function (err, results) {
            console.log("result login", results);
            if (results.length > 0 && !err) {
                res.send({
                    success: true,
                    user_id: results[0].user_id
                })
            } else {
                res.send({
                    success: false
                })
            }
        });
    }
});

module.exports = app;