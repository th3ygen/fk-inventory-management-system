const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    title: String,
    content: String,
    senderId: Types.ObjectId,
    receivers: [String],
    msgType: String,
    orderId: Types.ObjectId,
}, { timestamps: true });

schema.statics.add = async function (title, content, receivers, msgType) {
    const message = new this({
        title: title,
        content: content,
        receivers: receivers,
        msgType: msgType,
    });
    return message.save();
};

schema.methods.attachOrder = async function (orderId) {
    this.orderId = orderId;
    return this.save();
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


const Message = model("Message", schema);

module.exports = Message || model("Message", schema);