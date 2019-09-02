const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var usersRoutes = require('./controllers/routes/SignUp');
var loginRoutes = require('./controllers/routes/Login');
var productRoutes = require('./controllers/routes/ProductDetails');
var addToCart = require('./controllers/routes/AddtoCart');

var app = new express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(usersRoutes);
app.use(loginRoutes);
app.use(productRoutes);
app.use(addToCart); 

app.listen(4000, () => {
    console.log('Listening on port 4000')
});