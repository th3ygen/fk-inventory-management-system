const { Schema, model } = require("mongoose");

const schema = new Schema({
	vendor_ID: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	quantity: Number,
	unit_price: Number,
	barcode_ID: String,
	barcode_encoding: String,
});

schema.statics.getItems = function () {
	return this.find({});
};

schema.statics.getItem = function (id) {
	return this.findById(id);
};

schema.statics.addItem = function (
	name,
	unit_price,
	quantity,
	barcode_ID,
	barcode_encoding,
	vendor_ID
) {
	return new this({
		name,
		unit_price,
		quantity,
		barcode_ID,
		barcode_encoding,
		vendor_ID,
	}).save();
};

schema.statics.updateItem = async function (
	id,
	name,
	unit_price,
	quantity,
	barcode_ID,
	barcode_encoding,
	vendor_ID
) {
	const item = await this.findById(id);

	if (item) {
		item.name = name || item.name;
		item.unit_price = unit_price || item.unit_price;
		item.quantity = quantity || item.quantity;
		item.barcode_ID = barcode_ID || item.barcode_ID;
		item.barcode_encoding = barcode_encoding || item.barcode_encoding;
		item.vendor_ID = vendor_ID || item.vendor_ID;

		return item.save();
	}

	return null;
};

schema.statics.updateQuantity = async function (id, adjustment) {
	const item = await this.findById(id);

	if (item) {
		item.quantity += adjustment;

		return item.save();
	}

	return null;
};

schema.statics.deleteItem = function (id) {
	return this.findByIdAndDelete(id);
};

const Item = model("Item", schema);

module.exports = Item;
