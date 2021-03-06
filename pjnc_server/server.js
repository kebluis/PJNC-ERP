'use strict';

// require express
const express = require('express');

// Import DB Connection
require('./config/db');

// create express app
const app = express();

var cors = require('cors');

const corsOptions = {
	origin: 'http://example.com',
	optionsSuccessStatus: 200,
};

app.use(cors());

// define port to run express app
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import API route
const orderRoutes = require('./routes/orderRoute');
const customerRoutes = require('./routes/customerRoute');
const productRoutes = require('./routes/productRoute');

//importing route
orderRoutes(app);
customerRoutes(app);
productRoutes(app);

// Listen to server
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
