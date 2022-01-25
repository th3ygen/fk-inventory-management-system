const { Schema, model } = require('mongoose');

const schema = new Schema({
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
}, {
    timestamps: true,
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
schema.statics.getVendor = function(id) {
    return this.findById(id);
}
// get all vendor
schema.statics.getAllVendors = function() {
    return this.find({});
}

// update vendor
schema.statics.updateVendors = async function(id,company_name,brand,contact,address,email,pic_name,pic_contact) {
    const vendor = await this.findById(id);

    vendor.company_name = company_name;
    vendor.brand = brand;
    vendor.contact = contact;
    vendor.address = address;
    vendor.email = email;
    vendor.pic_name = pic_name;
    vendor.pic_contact = pic_contact;

    return vendor.save();
}

// delete vendor
schema.statics.deleteVendor = function(id) {

    return this.findByIdAndDelete(id);
    
}

const Vendors = model('Vendors', schema);

module.exports = Vendors;