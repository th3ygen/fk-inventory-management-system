const Item = require("../models/Item");
const Vendor = require('../models/Vendors');
const ItemSold = require('../models/ItemSold');

module.exports = {
	// GET
	getItems: async function (req, res) {
		try {
			let items = await Item.getItems();

            // append vendor name to each item
            const vendors = await Vendor.getAllVendors();
            
            let result = [];
            
            for (let i = 0; i < items.length; i++) {
                let item = Object.assign({}, items[i]._doc);

                let vendor = vendors.find(vendor => vendor._id.toString() === item.vendor_ID.toString());

                if (vendor) {
                    item["vendor_name"] = vendor.company_name;
                }

                result.push(item);
            }

			res.status(200).json(result);
		} catch (e) {
			console.log(`[ERROR] ${e}`);
			res.status(500).json({
				error: e,
			});
		}
	},
	// GET
	getItem: async function (req, res) {
		try {
			const { id } = req.params;

			const item = await Item.getItem(id);
			
			if (item) {
				const result = Object.assign({}, item._doc);

				const vendor = await Vendor.findById(result.vendor_ID);

				result.vendor_name = vendor.company_name;

				res.status(200).json(result);
			} else {
				res.status(404).json({
					error: "Item not found",
				});
			}
		} catch (e) {
			console.log(`[ERROR] ${e}`);
			res.status(500).json({
				error: e,
			});
		}
	},
	// POST
	addItem: async function (req, res) {
		try {
			const {
				name,
				unit_price,
				quantity,
				barcode_ID,
				barcode_encoding,
				vendor_ID,
			} = req.body;

			const item = await Item.addItem(
				name,
				unit_price,
				quantity,
				barcode_ID,
				barcode_encoding,
				vendor_ID
			);

			res.status(200).json(item);
		} catch (e) {
			console.log(`[ERROR] ${e}`);
			res.status(500).json({
				error: e,
			});
		}
	},
	// POST
	updateItem: async function (req, res) {
		try {
			const { id, name, quantity, unit_price, barcode_ID, vendor_ID } =
				req.body;

			const item = await Item.updateItem(
				id,
				name,
				quantity,
				unit_price,
				barcode_ID,
				vendor_ID
			);

			if (item) {
				res.status(200).json(item);
			} else {
				res.status(404).json({
					error: "Item not found",
				});
			}
		} catch (e) {
			console.log(`[ERROR] ${e}`);
			res.status(500).json({
				error: e,
			});
		}
	},
	// GET
	deleteItem: async function (req, res) {
		try {
			const { id } = req.params;

			const item = await Item.deleteItem(id);

			res.status(200).json({
				message: "Item deleted",
			});
		} catch (e) {
			console.log(`[ERROR] ${e}`);
			res.status(500).json({
				error: e,
			});
		}
	},
	// POST
	addSoldItem: async function (req, res) {
		try {
			const { item_ID, quantity } = req.body;

			const item = await Item.findById(item_ID);

			if (item) {
				if (item.quantity < quantity) {
					return res.status(400).json({
						error: "Sold quantity exceed item quantity",
					});
				}

				const soldItem = new ItemSold({
					item_ID: item_ID,
					quantity: quantity,
					total: item.unit_price * quantity,
				});

				await soldItem.save();

				// deduct quantity from item
				await Item.updateQuantity(item_ID, quantity * -1);

				res.status(200).json({
					message: "Item sold",
				});
			} else {
				res.status(404).json({
					error: "Item not found",
				});
			}
		} catch (e) {
			console.log(`[ERROR] ${e}`);
			res.status(500).json({
				error: e,
			});
		}
	},
	// GET
	getSoldItems: async function (req, res) {
		try {
			const items = await ItemSold.getSalesWithItemDetails();

			res.status(200).json(items);
		} catch (e) {
			console.log(`[ERROR] ${e}`);
			res.status(500).json({
				error: e,
			});
		}
	},

	// GET
	getSoldItem: async function (req, res) {
		try {
			const { id } = req.params;

			const item = await ItemSold.find({ item_ID: id });

			if (item) {
				res.status(200).json(item);
			} else {
				res.status(404).json({
					error: "Item not found",
				});
			}
		} catch (e) {
			console.log(`[ERROR] ${e}`);
			res.status(500).json({
				error: e,
			});
		}
	},

	// GET
	getWeeklySales: async function (req, res) {
		try {
			const items = await ItemSold.getWeeklySales();

			res.status(200).json(items);
		} catch (e) {
			console.log(`[ERROR] ${e}`);
			res.status(500).json({
				error: e,
			});
		}
	},

	// GET
	getMonthySales: async function (req, res) {
		try {
			const items = await ItemSold.getMonthlySales();

			res.status(200).json(items);
		} catch (e) {
			console.log(`[ERROR] ${e}`);
			res.status(500).json({
				error: e,
			});
		}
	},

	// GET
	getWeeklyProfit: async function (req, res) {
		try {
			const items = await ItemSold.getWeeklyProfit();

			res.status(200).json(items);
		} catch (e) {
			console.log(`[ERROR] ${e}`);
			res.status(500).json({
				error: e,
			});
		}
	},

	// GET
	getMonthlyProfit: async function (req, res) {
		try {
			const items = await ItemSold.getMonthlyProfit();

			res.status(200).json(items);
		} catch (e) {
			console.log(`[ERROR] ${e}`);
			res.status(500).json({
				error: e,
			});
		}
	}
};
