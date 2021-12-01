// import Customer Model
const Customer = require('../models/customerModel');

// DEFINE CONTROLLER FUNCTIONS

// listAllCustomers function - To list all customers
exports.listAllCustomers = (req, res) => {
	Customer.find({}, (err, customer) => {
		if (err) {
			res.status(500).send(err);
		}
		res.status(200).json(customer);
	});
};

// createNewCustomer function - To create new customer
exports.createNewCustomer = (req, res) => {
	const newCustomer = new Customer(req.body);
	console.log(newCustomer);
	newCustomer.save().then(console.log).catch(console.error);
	res.json(newCustomer);
};

// updateCustomer function - To update customer status by id
exports.updateCustomer = (req, res) => {
	Customer.findOneAndUpdate(
		{ _id: req.params.id },
		req.body,
		{ new: true },
		(err, customer) => {
			if (err) {
				res.status(500).send(err);
			}
			res.status(200).json(customer);
		}
	);
};

// deleteCustomer function - To delete customer by id
exports.deleteCustomer = async (req, res) => {
	await Customer.deleteOne({ _id: req.params.id }, (err) => {
		if (err) {
			return res.status(404).send(err);
		}
		res.status(200).json({ message: 'Customer successfully deleted' });
	});
};
