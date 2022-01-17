const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// hardcoded secret key, irl this should be in a config file
const secret = "s33eecr3t";

const schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	role: String,
	contact: {
		type: String,
		required: true,
	},
	address: {
		type: String,
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
}, {
    timestamps: true,
});

// CRUD - create
schema.statics.addAccount = function (
	name,
	email,
	role,
	contact,
	address,
	username,
	password
) {
	const accounts = new this({
		name: name,
		email: email,
		role: role,
		contact: contact,
		address: address,
		username: username,
		password: password,
	});
	return accounts.save();
};

// CRUD - read
schema.statics.getAccounts = function () {
	return this.find({});
};

schema.statics.getAccount = function (account_ID) {
	return this.findById(account_ID);
};

// CRUD - update
schema.statics.updateAccount = async function (
	account_ID,
	name,
	email,
	role,
	contact,
	address,
	username
) {
	const account = await this.findById(account_ID);

	if (account) {
		account.name = name;
		account.email = email;
		account.role = role;
		account.contact = contact;
		account.address = address;
		account.username = username;

		return account.save();
	}

	return null;
};

// CRUD - delete
schema.statics.deleteAccount = function (account_ID) {
	return this.findByIdAndDelete(account_ID);
};


schema.statics.login = async function (username, password) {
	const user = await this.findOne({ username });

	if (user) {
		const isValid = await bcrypt.compare(password, user.password);

		if (isValid) {
			const token = jwt.sign(
				{
					_id: user._id,
					username: user.username,
					role: user.role,
				},
				secret,
				{ expiresIn: "10h" }
			);

			return token;
		}
	}

	return null;
};

schema.statics.register = function (username, password, email, contact) {
    password = bcrypt.hashSync(password, 10);

	const user = new this({ username, password, email, contact });

	return user.save();
};

// TODO add notify admin function
schema.statics.forgetPW = function () {};
// TODO hashing
schema.statics.updatePW = async function (username, password) {
	const user = await this.findOne({ username });
	if (user) {
		user.password = password;
		return user.save();
	}
};

const Account = model("Account", schema);

module.exports = { Account };
