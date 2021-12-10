const { Schema, model } = require('mongoose');

const schema = new Schema({
    vendor_ID: Schema.Types.ObjectId,
    company_name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pic_name: {
        type: String,
        required: true
    },
    pic_contact: {
        type: String,
        required: true
    },
});

// add vendors
schema.statics.addVendors = function(company_name, brand, contact, address, email,
    pic_name, pic_contact) {
    const vendors = new this({
        company_name: company_name,
        brand: brand,
        contact: contact,
        address: address,
        email: email,
        pic_name: pic_name,
        pic_contact: pic_contact
    });
    return vendors.save();
}

// get vendor
schema.statics.getVendor = function(queryName) {
    return this.findOne({ company_name: queryName });
}
// get all vendor
schema.statics.getAllVendors = function() {
    return this.findOne();
}

// update vendor
schema.methods.updateVendors = function(vendor_ID,company_name,brand,contact,address,email,pic_name,pic_contact) {
    const filter = { vendor_ID: vendor_ID};
    const update = {
        company_name: company_name,
        brand: brand,
        contact: contact,
        address: address,
        email: email,
        pic_name: pic_name,
        pic_contact: pic_contact
    };
    return this.findOneAndUpdate(filter,update);
}

// delete vendor
schema.methods.removeVendor = function(id) {
    return this.remove(id);
}

const Vendors = model('Vendors', schema);

module.exports = { Vendors };