// jasmine : login, register,forget pw, update pw
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

// TO DO verify hash
schema.statics.login = async function(username, password) {
    const user = await this.findOne ({username})
    if (user) {
        if (user.password==password){
            return user
        }
    } 
}

schema.statics.register = function(username,password,email,contact){
    const user = new this ({username,password,email,contact})
    return user.save();
}

// TO DO add notify admin function
schema.statics.forgetPW = function (){
    
}
//TO DO hashing
schema.statics.updatePW = async function (username,password){
    const user = await this.findOne ({username})
    if (user) {
        user.password=password
        return user.save()
    }
}


const Account = model('Account', schema);

module.exports = { Account };

