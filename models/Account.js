const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Message = require('./Message');

// hardcoded secret key, irl this should be in a config file
const secret = "s33eecr3t";

const schema = new Schema(
	{
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
	},
	{
		timestamps: true,
	}
);

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
	password = bcrypt.hashSync(password, 10);

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
					name: user.name,
				},
				secret,
				{ expiresIn: "10h" }
			);

			return {
				token,
				username: user.username,
				role: user.role,
				name: user.name,
				id: user._id,
			};
		}
	}

	return null;
};

schema.statics.register = function (name, username, password, email, contact) {
	password = bcrypt.hashSync(password, 10);

	const user = new this({ name, username, password, email, contact, role: 'staff' });

	return user.save();
};

// TODO add notify admin function
schema.statics.forgotPW = async function (username) {
	const user = await this.findOne({ username });

	if (!user) {
		return null;
	}

	const content = 
	`
		Requesting for password change<br/><br/>
		Email: ${user.email}<br/>
		Username: ${username}<br/>
	`;

	return Message.add('Forgot Password', content, ['admin'], 'forgotpw');
};
// TODO hashing
schema.statics.updatePW = async function (id, password) {
	const user = await this.findById(id);
	if (user) {
		password = bcrypt.hashSync(password, 10);

		user.password = password;
		return user.save();
	}
};

const Account = model("Account", schema);

module.exports = Account;
