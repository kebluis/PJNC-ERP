'use strict';
// Import mongoose
const mongoose = require('mongoose');

// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance and add schema properties
const OrderSchema = new Schema({
	_id: Schema.Types.ObjectId,
	customer: { type: Schema.Types.ObjectId, ref: 'customerModel' },
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
