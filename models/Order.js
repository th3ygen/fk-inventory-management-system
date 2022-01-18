const { Schema, model } = require('mongoose');
const Vendor = require ('./Vendors');

const schema = new Schema({
    
    vendor_ID: Schema.Types.ObjectId,
    manager_ID: Schema.Types.ObjectId,
    grand_total: {
        type: Number,
        required: true
    },
    comment: String,
    approve_date: Date,
    manager_remarks: String,
    status: String,
    items: [Object]
}, {
    timestamps: true,
});

schema.statics.getOrders = function() {
    return this.find({});
}

schema.statics.getOrder = function(id){
    return this.findById(id);
}

/* 
    orderItems: {
        item_name, quantity, unit_price
    }
*/
schema.statics.addOrder = function(vendor_ID, comment, orderItems) {
    let grand_total = 0;
    for (let item of orderItems) {
        grand_total += parseInt(item.quantity) * parseFloat(item.unit_price);
    }
    
    const order = new this({
        vendor_ID,
        comment,
        grand_total,
        items: orderItems,
        status: "Pending",
    });

    return order.save();
}

schema.statics.updateOrder = async function (id, comment, orderItems) {
    
    const order = await this.findById(id);
    
    let grand_total = 0;
    for (let item of orderItems) {
        grand_total += parseInt(item.quantity) * parseFloat(item.unit_price);
    }

    order.comment = comment;
    order.items = orderItems;

    return order.save();
}

schema.statics.verifiedOrder = async function(id, status, managerRemarks, managerID){

    const order = await this.findById(id);

    order.status = status;
    order.manager_remarks =managerRemarks;
    order.manager_ID = managerID;

    return order.save();
}

schema.statics.deleteOrder = function(id){
    
    return this.findByIdAndDelete(id);
}


const Order = model('Order', schema);

module.exports = Order;

