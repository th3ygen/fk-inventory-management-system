const { Schema, model } = require('mongoose');

const schema = new Schema({
    vendor_ID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: Number,
    unit_price: Number,
    barcode_ID: String,
});

schema.statics.getItems = function() {
    return this.find({});   
}

schema.statics.getItem = function(id) {
    return this.findById(id);
}

schema.statics.addItem = function(name, unit_price, barcode_ID, vendor_ID) {
    return new this({
        name, unit_price, barcode_ID, vendor_ID
    });
}

schema.statics.updateItem = async function(id, name, unit_price, barcode_ID, vendor_ID) {
    const item = await this.findById(id);

    if (item) {
        item.name = name;
        item.unit_price = unit_price;
        item.barcode_ID = barcode_ID;
        item.vendor_ID = vendor_ID;

        return item.save();
    }

    return null;
}

schema.statics.deleteItem = function(id) {
    return this.findByIdAndDelete(id);
}

const Item = model('Item', schema);

module.exports = Item;

