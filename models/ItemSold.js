const { Schema, model } = require("mongoose");

const Item = require("../models/Item");

const schema = new Schema(
	{
		item_ID: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		quantity: Number,
		total: Number,
	},
	{
		timestamps: true,
	}
);

schema.statics.getSalesWithItemDetails = async function () {
	// get all sold items, group by item_ID
	// calculate the total quantity and total sales
	// get the item details
	// add vendor details to the item

	const items = this.aggregate([
        {
            $group: {
                _id: "$item_ID",
                quantity: { $sum: "$quantity" },
                total: { $sum: "$total" },
            },
        },
        {
            $lookup: {
                from: "items",
                localField: "_id",
                foreignField: "_id",
                as: "item",
            },
        },
        {
            $project: {
                _id: 0,
                item_ID: "$_id",
                quantity: "$quantity",
                total: "$total",
                item: {
                    $arrayElemAt: ["$item", 0],
                },
            },
        },
    ]);

    return items;
};

/* return this.aggregate([
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
    ]); */
/* }; */

schema.statics.getWeeklySales = async function () {
	/* get all items in the current week */
	/* calculate the average sales on each day */
	const today = new Date();

	const start = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() - today.getDay() + 1
	);
	const end = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() - today.getDay() + 7
	);

	const items = await this.find({
		createdAt: {
			$gte: start,
			$lt: end,
		},
	});

	const averageSalesPerDay = [];
	let totalQuantity = 0;

	for (let i = 0; i < 7; i++) {
		averageSalesPerDay.push(0);
	}

	for (let i = 0; i < items.length; i++) {
		const item = items[i];

		const date = new Date(item.createdAt);

		const day = date.getDay();

		averageSalesPerDay[day] += item.total;
		totalQuantity += item.quantity;
	}

	for (let i = 0; i < averageSalesPerDay.length; i++) {
		averageSalesPerDay[i] /= totalQuantity;

		// to 2 decimal places
		averageSalesPerDay[i] = Math.round(averageSalesPerDay[i] * 100) / 100;
	}

	/* 
        create array of objects
        the object is { date: Date, value: sales }
    */
	const sales = [];

	for (let i = 0; i < averageSalesPerDay.length; i++) {
		const date = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);

		sales.push({
			date,
			value: averageSalesPerDay[i],
		});
	}

	return sales;
};

schema.statics.getWeeklyProfit = function () {
	const today = new Date();

	const start = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() - today.getDay() + 1
	);
	const end = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() - today.getDay() + 7
	);

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
};

module.exports = model("ItemSold", schema);
