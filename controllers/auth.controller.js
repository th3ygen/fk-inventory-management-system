const Account = require('../Account');

module.exports = {
    // POST
    login: async function(req, res) {
        try {
            const { username, password } = req.body;

            const user = await Account.login(username,password);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({
                    error: 'User not found/ wrong password'
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
    register: async function(req, res) {
        try {
            const { email, username, password, contact } = req.body;

            const user = await Account.register(email, username, password, contact);
            res.status(200).json(user);
        } catch(e) {
            console.log(`[ERROR] ${e}`);
            res.status(500).json({
                error: e
            });
        }
    },
    // POST
    forgotPW: async function(req, res) {
        try {
            const { email, username } = req.body;

            await Account.forgotPW(email, username);

           
            res.status(200).json({
                message: 'Request Sent'
            });
            
        } catch(e) {
            console.log(`[ERROR] ${e}`);
            res.status(500).json({
                error: e
            });
        }
    },
    //  POST
    updatePW: function(req, res) {
        try {
            const { account_ID, password } = req.body;

            await Account.forgotPW(account_ID, password);

           
            res.status(200).json({
                message: 'Password Updated'
            });
            
        } catch(e) {
            console.log(`[ERROR] ${e}`);
            res.status(500).json({
                error: e
            });
        }
   
    }
}