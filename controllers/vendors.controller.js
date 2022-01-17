const Vendors = require("../models/Vendors");

module.exports = {
	// GET
	getVendor: async function (req, res) {
		try {
			const { id } = req.params;

			const vendors = await Vendors.getVendor(id);

			res.status(200).json();

			if (item) {
				res.status(200).json(item);
			} else {
				res.status(404).json({
					error: "Vendor not found",
				});
			}
		} catch (e) {
			console.log(`[ERROR] ${e}`);
			res.status(500).json({
				error: e,
			});
		}
	},
	getAllVendor: async function (req, res) {
		try {
			const vendors = await Vendors.getAllVendors();

			if (vendors) {
				res.status(200).json(vendors);
			} else {
				res.status(404).json({
					error: "No vendor created",
				});
			}
		} catch (e) {
			console.log(`[ERROR] ${e}`);
			res.status(500).json({
				error: e,
			});
		}
	},
	addVendor: async function (req, res) {
		try {
			const {
				company_name,
				brand,
				contact,
				address,
				email,
				pic_name,
				pic_contact,
			} = req.body;

			const vendor = await Vendors.addVendors(
				company_name,
				brand,
				contact,
				address,
				email,
				pic_name,
				pic_contact
			);

			res.status(200).json(vendor);
		} catch (e) {
			console.log(`[ERROR] ${e}`);
			res.status(500).json({
				error: e,
			});
		}
	},
	updateVendor: async function (req, res) {
		try {
			const {
				vendor_ID,
				company_name,
				brand,
				contact,
				address,
				email,
				pic_name,
				pic_contact,
			} = req.body;

			const vendor = await Vendors.updateVendors(
				vendor_ID,
				company_name,
				brand,
				contact,
				address,
				email,
				pic_name,
				pic_contact
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
	deleteVendor: function (req, res) {
		try {
			const { id } = req.params;

			const vendor = Vendors.removeVendor(id);

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
