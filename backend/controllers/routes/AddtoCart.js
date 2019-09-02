const express = require('express');
const con = require('./../../database/Connection');

var app = new express.Router();

app.post('/cart', function (req, res) {
	var data = [
		req.body.productId,
		req.body.userId,
		req.body.quantity,
		req.body.totalPrice
	];
	var productId = req.body.productId;
	var userId = req.body.userId
	if (productId && userId) {
		con.query("SELECT * FROM cart_details WHERE product_id = ? AND user_id = ?", [productId, userId], function (err, results) {
			if (results.length != 0 && !err) {
				con.query("UPDATE cart_details SET quantity = quantity + 1 WHERE product_id = '" + productId + "'", function (err, result) {
					if (err) throw err;
					res.send(result.affectedRows + "record(s) updated !")
				});
			}
			else {
				var sql = "INSERT INTO cart_details (product_id, user_id, created_on, quantity, total_price) VALUES ( ?, ?, CURRENT_TIMESTAMP, ?, ?)";
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
						console.log("error post", err);
					}
				})
			}
		})
	}
})

app.get('/cart', function (req, res) {
	con.query("SELECT cd.cart_id, cd.quantity, cd.product_id, cd.total_price, pd.product_name, pd.price FROM cart_details AS cd INNER JOIN product_details AS pd ON cd.product_id = pd.product_id WHERE cd.user_id = ? ", [req.query.user_id], function (err, result) {
		if (err) throw err;
		res.send(result);
	});
})

app.put('/cart', function (req, res) {
	var sql = "UPDATE cart_details SET quantity ='" + req.body.quantity + "'WHERE cart_id = '" + req.query.cart_id + "'";
	con.query(sql, function (err, result) {
		if (err) throw err;
		res.send(result.affectedRows + "record(s) updated !")
	});
})

app.delete('/cart', function (req, res) {
	var sql = "DELETE FROM cart_details WHERE cart_id = '" + req.query.cart_id + "'";
	con.query(sql, function (err, result) {
		if (err) throw err;
		res.send("Number of records deleted: " + result.affectedRows);
	});
})
app.delete('/placeorder', function (req, res) {
	var sql = "DELETE FROM cart_details WHERE user_id = '" + req.query.user_id + "'";
	con.query(sql, function (err, result) {
		if (err) throw err;
		res.send("Number of records deleted: " + result.affectedRows);
	});
})
module.exports = app;