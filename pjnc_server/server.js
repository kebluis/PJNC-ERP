'use strict';

// require express
const express = require('express');

// Import DB Connection
require('./config/db');

// create express app
const app = express();

// define port to run express app
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import API route
const orderRoutes = require('./routes/orderRoute');
const customerRoutes = require('./routes/customerRoute');

//importing route
orderRoutes(app);
customerRoutes(app);

// // Add endpoint
// app.get('/', (req, res) => {
// 	res.json({
// 		name: 'kevin',
// 		age: '28',
// 	});
// });

// Listen to server
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
