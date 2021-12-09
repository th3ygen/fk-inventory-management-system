const Item = require('../Item');

module.exports = {
    // GET
    getItems: async function(req, res) {
        try {
            const items = await Item.getItems();

            res.status(200).json(items);
        } catch(e) {
            console.log(`[ERROR] ${e}`);
            res.status(500).json({
                error: e
            });
        }
    },
    // GET
    getItem: async function(req, res) {
        try {
            const { id } = req.params;

            const item = await Item.getItem(id);

            if (item) {
                res.status(200).json(item);
            } else {
                res.status(404).json({
                    error: 'Item not found'
                });
            }

        } catch(e) {
            console.log(`[ERROR] ${e}`);
            res.status(500).json({
                error: e
            });
        }
    },
    // POST
    addItem: async function(req, res) {
        try {
            const { name, unit_price, barcode_ID, vendor_ID } = req.body;

            const item = await Item.addItem(name, unit_price, barcode_ID, vendor_ID);

            res.status(200).json(item);
        } catch(e) {
            console.log(`[ERROR] ${e}`);
            res.status(500).json({
                error: e
            });
        }
    },
    // POST
    updateItem: async function(req, res) {
        try {
            const { name, quantity, unit_price, barcode_ID, vendor_ID } = req.body;

            const item = await Item.updateItem(name, quantity, unit_price, barcode_ID, vendor_ID);

            if (item) {
                res.status(200).json(item);
            } else {
                res.status(404).json({
                    error: 'Item not found'
                });
            }
        } catch(e) {
            console.log(`[ERROR] ${e}`);
            res.status(500).json({
                error: e
            });
        }
    },
    // GET
    deleteItem: function(req, res) {
        try {
            const { id } = req.params;

            const item = Item.deleteItem(id);

            res.status(200).json({
                message: 'Item deleted'
            });
        } catch(e) {
            console.log(`[ERROR] ${e}`);
            res.status(500).json({
                error: e
            });
        }
    }
}