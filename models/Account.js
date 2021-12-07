// jasmine : login, register,forget pw, update pw

const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner_ID: Schema.Types.ObjectId,
    description: String,
    scores: [Number]
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

