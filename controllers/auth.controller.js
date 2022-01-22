const Account = require("../models/Account");

module.exports = {
	// POST
	login: async function (req, res) {
		try {
			const { username, password } = req.body;

			const account = await Account.login(username, password);
			if (account) {
				res.status(200).json({
                    token: account.token, username: account.username, name: account.name, id: account.id, role: account.role
                });
			} else {
				res.status(401).json({
					error: "User not found/ wrong password",
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
	register: async function (req, res) {
		try {
			const { name, email, username, password, contact } = req.body;

			const user = await Account.register(
				name,
				username,
				password,
				email,
				contact,
			);
			res.status(200).json(user);
		} catch (e) {
			console.log(`[ERROR] ${e}`);
			res.status(500).json({
				error: e,
			});
		}
	},
	// POST
	forgotPW: async function (req, res) {
		try {
			const { email, username } = req.body;

			await Account.forgotPW(email, username);

			res.status(200).json({
				message: "Request Sent",
			});
		} catch (e) {
			console.log(`[ERROR] ${e}`);
			res.status(500).json({
				error: e,
			});
		}
	},
	//  POST
	updatePW: async function (req, res) {
		try {
			const { account_ID, password } = req.body;

			await Account.forgotPW(account_ID, password);

			res.status(200).json({
				message: "Password Updated",
			});
		} catch (e) {
			console.log(`[ERROR] ${e}`);
			res.status(500).json({
				error: e,
			});
		}
	},
};
