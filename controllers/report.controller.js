const Item = require('../models/Item');
const ItemSold = require('../models/ItemSold'); 

module.exports = {
    getMostSold: async (req, res) => {
        try {
            // get the total quantity of item sold for a month
            // grouped by the item_ID
            const totalQuantitySold = await ItemSold.aggregate([
                {
                    $group: {
                        _id: '$item_ID',
                        totalQuantitySold: {
                            $sum: '$quantity'
                        }
                    }
                }
            ]);

            const items = [];

            for (let i of totalQuantitySold) {
                const item = await Item.findById(i._id);

                if (item) {
                    items.push({
                        name: item.name,
                        quantity: i.totalQuantitySold
                    });
                }
            }

            const top = items.sort((a, b) => b.quantity - a.quantity).slice(0, 5);

            res.status(200).json(top);
        } catch (e) {
            res.status(500).json({
                message: e.message
            });
        }
    },
    getLeastSold: async (req, res) => {
        try {
            // get the total quantity of item sold for a month
            // grouped by the item_ID
            const totalQuantitySold = await ItemSold.aggregate([
                {
                    $group: {
                        _id: '$item_ID',
                        totalQuantitySold: {
                            $sum: '$quantity'
                        }
                    }
                }
            ]);

            const items = [];

            for (let i of totalQuantitySold) {
                const item = await Item.findById(i._id);

                if (item) {
                    items.push({
                        name: item.name,
                        quantity: i.totalQuantitySold
                    });
                }
            }

            const top = items.sort((a, b) => a.quantity - b.quantity).slice(0, 5);

            res.status(200).json(top);
        } catch (e) {
            res.status(500).json({
                message: e.message
            });
        }
    }
}