const PrettyError = require('pretty-error');

const Message = require('../models/Message');
const User = require('../models/Account');

const pe = new PrettyError();

module.exports = {
    get: async (req, res) => {
        try {
            const { id } = req.params;

            const message = await Message.findById(id);

            if (!message) {
                return res.status(404).json({
                    message: 'Message not found',
                });
            }

            return res.status(200).json(message);
        } catch (err) {
            console.log(pe.render(err));
            res.status(500).send('Server error');
        }
    },
    add: async (req, res) => {
        try {
            const { title, content, receivers, senderId } = req.body;

            const result = await Message.add(title, content, receivers, senderId);

            res.status(200).json(result);
        } catch (error) {
            console.log(pe.render(error));
            res.status(500).json({
                error: error,
            });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;

            const result = await Message.delete(id);

            res.status(200).json({
                msg: 'Message deleted',
            });
        } catch (error) {
            console.log(pe.render(error));
            res.status(500).json({
                error: error,
            });
        }
    },
    list: async (req, res) => {
        try {
            const { receiver } = req.query;

            /* const user = await User.getById(id);

            if (!user) {
                return res.status(404).json({
                    error: 'User not found',
                });
            } */

            const result = await Message.list(receiver);

            res.status(200).json(result);
        } catch (error) {
            console.log(pe.render(error));
            res.status(500).json({
                error: error,
            });
        }
    },
    markAsRead: async (req, res) => {
        try {
            const { id } = req.body;

            const result = await Message.markAsRead(id);

            res.status(200).json(result);
        } catch (error) {
            console.log(pe.render(error));
            res.status(500).json({
                error: error,
            });
        }
    }
}