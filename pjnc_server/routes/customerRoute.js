'use strict';

// create App function
module.exports = (app) => {
	const customerList = require('../controllers/customerController');

	// customerList Routes

	// get and post request for /customers endpoints
	app
		.route('/customers')
		.get(customerList.listAllCustomers)
		.post(customerList.createNewCustomer);

	// put and delete request for /customers endpoints
	app
		.route('/customer/:id')
		.put(customerList.updateCustomer)
		.delete(customerList.deleteCustomer);
};
