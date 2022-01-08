//const Account = require('../Account');
const { Account } = require('../models/Account');

module.exports = {
    // GET
    getAccounts: async function(_req, res) {
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
            const {account_ID} = req.params;

            const account = await Account.getAccount(account_ID);

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
    addAccount: async function(req, res) {
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
    deleteAccount: async function(req, res) {
        try {
            const { account_ID } = req.params;

            await Account.deleteAccount(account_ID);

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