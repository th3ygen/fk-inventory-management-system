const { Schema, model } = require("mongoose");

const Item = require("../models/Item");

const schema = new Schema({
    item_ID: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    quantity: Number,
    total: Number,
}, {
    timestamps: true,
});

schema.statics.getWeeklySales = function () {
    const today = new Date();

    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7);

    return this.find({
        createdAt: {
            $gte: start,
            $lt: end,
        },
    });
};

schema.statics.getWeeklyProfit = function () {
    const today = new Date();

    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7);

    return this.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: start,
                    $lt: end,
                },
            },
        },
        {
            $lookup: {
                from: "items",
                localField: "item_ID",
                foreignField: "_id",
                as: "item",
            },
        },
        {
            $unwind: "$item",
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$item.unit_price",
                },
            },
        },
    ]);
};

schema.statics.getMonthlyItemsSold = function () {
    const today = new Date();

    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return this.find({
        createdAt: {
            $gte: start,
            $lt: end,
        },
    });
};

schema.statics.getMonthlyProfit = function () {
    const today = new Date();

    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return this.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: start,
                    $lt: end,
                },
            },
        },
        {
            $lookup: {
                from: "items",
                localField: "item_ID",
                foreignField: "_id",
                as: "item",
            },
        },
        {
            $unwind: "$item",
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$item.unit_price",
                },
            },
        },
    ]);
}

module.exports = model("ItemSold", schema);