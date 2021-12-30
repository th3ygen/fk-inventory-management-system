const Device = require('../models/Device');
const Data = require('../models/Data');

module.exports = {
    getAll: async (req, res) => {
        try {
            const devices = await Device.find();
            res.status(200).json(devices);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getData: async (req, res) => {
        try {
            const { device_id, limit } = req.query;

            if (!device_id) {
                res.status(400).json({ message: 'Missing device_id' });
            }

            if (!limit) {
                res.status(400).json({ message: 'Missing limit' });
            }

            const data = await Data.getData(device_id, limit);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getDataInTimeRange: async (req, res) => {
        try {
            const { device_id, start, end } = req.query;

            if (!device_id) {
                res.status(400).json({ message: 'Missing device_id' });
            }

            if (!start) {
                res.status(400).json({ message: 'Missing start' });
            }

            if (!end) {
                res.status(400).json({ message: 'Missing end' });
            }

            const data = await Data.getDataInTimeRange(device_id, start, end);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    getAverage: async (req, res) => {
        try {
            const { device_id, start, end } = req.query;

            if (!device_id) {
                res.status(400).json({ message: 'Missing device_id' });
            }

            if (!start) {
                res.status(400).json({ message: 'Missing start' });
            }

            if (!end) {
                res.status(400).json({ message: 'Missing end' });
            }

            const data = await Data.getAverage(device_id, start, end);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
}