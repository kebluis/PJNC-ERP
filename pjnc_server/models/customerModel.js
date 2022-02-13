'use strict';
// Import mongoose
const mongoose = require('mongoose');

// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance and add schema properties
const CustomerSchema = new Schema({
	_id: Schema.Types.ObjectId,
	customerName: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	customerPrice: {
		type: Object,
	},
	isDeleted: {
		type: Boolean,
		required: true,
		default: false,
	},
});

// create and export model
module.exports = mongoose.model('customerModel', CustomerSchema);
