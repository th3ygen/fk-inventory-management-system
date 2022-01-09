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

schema.statics.getSalesWithItemDetails = function () {
    return this.aggregate([
        {
            $lookup: {
                from: "items",
                localField: "item_ID",
                foreignField: "_id",
                as: "item",
            },
        },
        {
            $unwind: {
                path: "$item",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "vendors",
                localField: "item.vendor_ID",
                foreignField: "_id",
                as: "vendor",
            },
        },
        {
            $unwind: {
                path: "$vendor",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                _id: 1,
                item_ID: 1,
                quantity: 1,
                total: 1,
                item: {
                    _id: 1,
                    name: 1,
                    unit_price: 1,
                    barcode_ID: 1,
                    barcode_encoding: 1,
                    vendor_ID: 1,
                },
                vendor: {
                    _id: 1,
                    company_name: 1,
                },
            },
        },
    ]);
};

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