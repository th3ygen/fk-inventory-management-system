const { Schema, models, model, Schema } = require('mongoose');

const DeviceSchema = new Schema({
    name: String,
    description: String,
});

module.export = models.Device || model('Device', DeviceSchema);