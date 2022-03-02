'use strict';
// Import mongoose
const mongoose = require('mongoose');

// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance and add schema properties
const ProductSchema = new Schema({
	_id: Schema.Types.ObjectId,
	productName: {
		type: String,
		required: true,
	},
	originalPrice: {
		type: String,
		required: true,
	},
	productStock: {
		type: String,
		required: true,
	},
	emptiesStock: {
		type: String,
		required: true,
	},
	marketPrice: {
		type: String,
		required: true,
	},
	supplier: {
		type: String,
		required: true,
	},
});

// create and export model
module.exports = mongoose.model('productModel', ProductSchema);
