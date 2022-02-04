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
