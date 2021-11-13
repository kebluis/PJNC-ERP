'use strict';

// create App function
module.exports = (app) => {
	const orderList = require('../controllers/orderController');

	// orderList Routes

	// get and post request for /orders endpoints
	app
		.route('/orders')
		.get(orderList.listAllOrders)
		.post(orderList.createNewOrder);

	// put and delete request for /orders endpoints
	app
		.route('/order/:id')
		.put(orderList.updateOrder)
		.delete(orderList.deleteOrder);
};
