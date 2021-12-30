const { Schema, models, model } = require('mongoose');

const DataSchema = new Schema({
    device_id: Schema.Types.ObjectId,
    values: {
        tds: Number,
        oxy: Number,
        ph: Number,
        temp: Number,
    },
    timestamp: Date,
});

DataSchema.statics.store = async function(device_id, values) {
    const data = await this.create({
        device_id, values, timestamp: Date.now()
    });

    return data;
}

DataSchema.statics.getData = async function (device_id, limit) {
    const data = await this.find({ device_id: device_id }).sort({ timestamp: -1 }).limit(parseInt(limit));
    return data;
};

DataSchema.statics.getDataInTimeRange = async function (device_id, start, end) {
    const data = await this.find({ device_id: device_id, timestamp: { $gte: start, $lte: end } });
    return data;
};
 
DataSchema.statics.getAverage = async function (device_id, start, end) {
    const data = await this.aggregate([
        {
            $match: {
                device_id: device_id,
                timestamp: { $gte: start, $lte: end }
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$timestamp"
                    }
                },
                tds: { $avg: "$values.tds" },
                oxy: { $avg: "$values.oxy" },
                ph: { $avg: "$values.ph" },
                temp: { $avg: "$values.temp" },
            }
        }
    ]);

    return data;
};


module.exports = models.Data || model('Data', DataSchema);