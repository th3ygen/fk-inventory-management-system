const Item = require("../models/Item");
const Vendor = require('../models/Vendors');

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
			const { name, quantity, unit_price, barcode_ID, vendor_ID } =
				req.body;

			const item = await Item.updateItem(
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
	deleteItem: function (req, res) {
		try {
			const { id } = req.params;

			const item = Item.deleteItem(id);

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
};
