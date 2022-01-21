const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    title: String,
    content: String,
    senderId: Types.ObjectId,
    receivers: [String],
    read: Boolean,
}, { timestamps: true });

schema.statics.add = async function (title, content, receivers, senderId) {
    const message = new this({
        title: title,
        content: content,
        receivers: receivers,
        senderId: senderId,
    });
    return message.save();
};

/* get all message that receivers array contains role */
schema.statics.list = async function (role) {
    return this.find({
        receivers: role,
    });
};

schema.statics.delete = async function (id) {
    return this.findByIdAndDelete(id);
};

schema.statics.markAsRead = async function (id) {
    return this.findByIdAndUpdate(id, { read: true });
};

const Message = model("Message", schema);

module.exports = Message || model("Message", schema);