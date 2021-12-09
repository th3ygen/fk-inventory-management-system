const Item = require('../Account');
const { Account } = require('../models/Account');

module.exports = {
    // GET
    getAccounts: async function(req, res) {
        try {
            const account = await Account.getAccounts();

            res.status(200).json(account);
        } catch(e) {
            console.log(`[ERROR] ${e}`);
            res.status(500).json({
                error: e
            });
        }
    },
    // GET
    getAccount: async function(req, res) {
        try {
            const {id} = req.params;

            const account = await Account.getAccount(id);

            if (account) {
                res.status(200).json(account);
            } else {
                res.status(404).json({
                    error: 'Account not found'
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
            const { name, email, role, contact, address, username, password } = req.body;

            const account = await Account.addAccount(name, email, role, contact, address, username, password);

            res.status(200).json(account);
        } catch(e) {
            console.log(`[ERROR] ${e}`);
            res.status(500).json({
                error: e
            });
        }
    },
    // POST
    updateAccount: async function(req, res) {
        try {
            const { name, email, role, contact, address, username } = req.body;

            const account = await Account.updateAccount(name, email, role, contact, address, username);

            if (account) {
                res.status(200).json(account);
            } else {
                res.status(404).json({
                    error: 'Account not found'
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
    deleteAccount: function(req, res) {
        try {
            const { username } = req.params;

            await Account.deleteAccount(username);

            res.status(200).json({
                message: 'Account deleted'
            });
        } catch(e) {
            console.log(`[ERROR] ${e}`);
            res.status(500).json({
                error: e
            });
        }
    }
}