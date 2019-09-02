const express = require('express');
const con = require('./../../Database/Connection');

var app = new express.Router();

app.get('/products', function (req, res) {
    if (!req.query.product_id) {
        con.query("SELECT product_id,product_name,product_info,category, price FROM product_details ", function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    } else {
        con.query("SELECT * FROM product_details WHERE product_id = " + req.query.product_id, function (err, result, fields) {
            if (err) throw err;
            res.send(result[0]);
        });
    }
}
);
module.exports = app;