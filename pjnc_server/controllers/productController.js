// import Product Model
const Product = require('../models/productModel');

// DEFINE CONTROLLER FUNCTIONS
const sortLatestToTop = (arr) => {
	return arr.reduceRight(function (previous, current) {
		previous.push(current);
		return previous;
	}, []);
};
// listAllProducts function - To list all products
exports.listAllProducts = (req, res) => {
	Product.find({}, (err, product) => {
		if (err) {
			res.status(500).send(err);
		}
		res.status(200).json(sortLatestToTop(product));
	});
};

// createNewProduct function - To create new product
exports.createNewProduct = (req, res) => {
	const newProduct = new Product(req.body);
	console.log(newProduct);
	newProduct.save().then(console.log).catch(console.error);
	res.json(newProduct);
};

// updateProduct function - To update product status by id
exports.updateProduct = (req, res) => {
	Product.findOneAndUpdate(
		{ _id: req.params.id },
		req.body,
		{ new: true },
		(err, product) => {
			if (err) {
				res.status(500).send(err);
			}
			res.status(200).json(product);
		}
	);
};

// deleteProduct function - To delete product by id
exports.deleteProduct = async (req, res) => {
	await Product.deleteOne({ _id: req.params.id }, (err) => {
		if (err) {
			return res.status(404).send(err);
		}
		res.status(200).json({ message: 'Product successfully deleted' });
	});
};

exports.changeStocks = (req, res) => {
	// Product.findByIdAndUpdate(
	// 	req.params.id,
	// 	{ productStock: req.body.productStock },
	// 	// {},
	// 	(err, customer) => {
	// 		console.log(customer);
	// 		console.log(req);
	// 		console.log(res);
	// 		if (err) {
	// 			res.status(500).send(err);
	// 		}
	// 		res.status(200).json(customer);
	// 	}
	// );
	Product.findById(req.params.id, (err, product) => {
		if (err) return res.status(500).send(err);
		console.log('id', req.params.id);
		console.log('product', product);
		console.log('requst', req.body);
		product.emptiesStock =
			Number(product.emptiesStock) + Number(req.body.emptiesStock);

		product.save((err, updatedProduct) => {
			if (err) return res.status(500).send(err);
			res.status(200).json(updatedProduct);
		});
	});
};

exports.changeEmpties = (req, res) => {
	console.log();
	Product.findByIdAndUpdate(
		req.params.id,
		{ emptiesStock: req.body.emptiesStock },
		(err, customer) => {
			if (err) {
				res.status(500).send(err);
			}
			res.status(200).json(customer);
		}
	);
};
