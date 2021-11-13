'use strict';
// Import mongoose
const mongoose = require('mongoose');

// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance and add schema properties
const OrderSchema = new Schema({
	orderNumber: {
		type: Number,
		required: true,
	},
	customerName: {
		type: String,
		required: true,
	},
	totalPrice: {
		type: String,
		default: '0',
		required: true,
	},
	amountPaid: {
		type: String,
		default: '0',
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	deliveryDate: {
		type: Date,
		default: Date.now,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
});

// create and export model
module.exports = mongoose.model('orderModel', OrderSchema);
