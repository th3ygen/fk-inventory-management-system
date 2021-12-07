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

