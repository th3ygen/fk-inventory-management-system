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
        required: false
    },
    contact:{
        type: String,
        required: false
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    created_at:{
        type: String,
        required: false
    },
    updated_at:{
        type: String,
        required: false
    },
});

// CRUD - create
schema.statics.addParticipant = function(name) {
    const participant = new this({
        name: name,
        description: '',
        scores: []
    });
    return participant.save();
}

// CRUD - read
schema.statics.getParticipant = function(queryName) {
    return this.findOne({name: queryName});
}

// CRUD - update
schema.methods.addScore = function(score) {
    this.scores.push(score);
    return this.save();
}

// CRUD - delete
schema.methods.removeParticipant = function() {
    return this.remove();
}

const Participant = model('Participant', schema);

module.exports = { Participant };

