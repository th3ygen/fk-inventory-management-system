const { Schema, model } = require('mongoose');

const schema = new Schema({

});

const OrderItem = model('OrderItem', schema);

module.exports = OrderItem;