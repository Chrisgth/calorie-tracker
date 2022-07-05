const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, 'Username is required'],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'Password is required']
	}
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

module.exports = User;