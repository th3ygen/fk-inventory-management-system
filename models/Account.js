const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    role: String,
    contact:{
        type: String,
        required: true
    },
    address:{
        type: String,
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    
});

// CRUD - create
schema.statics.addAccount = function(name, email, role, contact, address, username, password) {
    const accounts = new this({
        name: name,
        email: email,
        role: role,
        contact: contact,
        address: address,
        username: username,
        password: password
    });
    return accounts.save();
}

// CRUD - read
schema.statics.getAccounts = function() {
    return this.find();
}

schema.statics.getAccount = function(id) {
    return this.findById(id);
}

// CRUD - update
schema.methods.updateAccount = function(name, email, role, contact, address, username) {
    this.name = name,
    this.email = email,
    this.role = role,
    this.contact = contact,
    this.address = address,
    this.username = username
    return this.save();
}

// CRUD - delete
schema.methods.deleteAccount = function() {
    return this.remove();
}

schema.statics.deleteAccountByUsername = async function(username){
    const user = await this.findOne({
        username
    })
    if (user){
        return user.remove();
    }
    return null;
}

const Account = model('Account', schema);

module.exports = { Account };

