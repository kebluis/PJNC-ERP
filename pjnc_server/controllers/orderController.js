// import Order Model
const Order = require('../models/orderModel');

// DEFINE CONTROLLER FUNCTIONS

// listAllOrders function - To list all orders
exports.listAllOrders = (req, res) => {
	Order.find({}, (err, order) => {
		if (err) {
			res.status(500).send(err);
		}
		res.status(200).json(order);
	});
};

// createNewOrder function - To create new order
exports.createNewOrder = (req, res) => {
	const newOrder = new Order(req.body);
	console.log(newOrder);
	newOrder.save().then(console.log).catch(console.error);
	res.json(newOrder);
};

// updateOrder function - To update order status by id
exports.updateOrder = (req, res) => {
	Order.findOneAndUpdate(
		{ _id: req.params.id },
		req.body,
		{ new: true },
		(err, order) => {
			if (err) {
				res.status(500).send(err);
			}
			res.status(200).json(order);
		}
	);
};

// deleteOrder function - To delete order by id
exports.deleteOrder = async (req, res) => {
	await Order.deleteOne({ _id: req.params.id }, (err) => {
		if (err) {
			return res.status(404).send(err);
		}
		res.status(200).json({ message: 'Order successfully deleted' });
	});
};
