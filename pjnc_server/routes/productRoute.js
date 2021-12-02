'use strict';

// create App function
module.exports = (app) => {
	const productList = require('../controllers/productController');

	// productList Routes

	// get and post request for /products endpoints
	app
		.route('/products')
		.get(productList.listAllProducts)
		.post(productList.createNewProduct);

	// put and delete request for /products endpoints
	app
		.route('/product/:id')
		.put(productList.updateProduct)
		.delete(productList.deleteProduct);
};
