const passport = require("passport");
const bcryptjs = require('bcryptjs');
const User = require('../models/user.js');
const asyncHandler = require('express-async-handler')

const signup = asyncHandler(async(req, res) => {
	const { username, password } = req.body

	if(!username || !password) {
		res.status(400)
		throw new Error('Please fill out all the fields')
	}

	const userExists = await User.findOne({username})

	if(userExists) {
		res.status(400)
		throw new Error('User already exists')
	}

	const salt = await bcryptjs.genSalt(10)
	const hashedPassword = await bcryptjs.hash(password, salt)

	const user = await new User({
		username,
		password: hashedPassword
	})

	user.save()
		.then((response) => {
			res.status(201).redirect('http://localhost:3000/log-in')
		})
		.catch((err) => {
			res.status(400)
			throw new Error('Invalid data')
		})
});

const login = asyncHandler(async (req, res) => {
	const {username, password} = req.body

	const user = await User.findOne({username})

	if(user && (await bcryptjs.compare(password, user.password))){
		res.redirect('http://localhost:3000/')
	} else {
		res.status(400)
		throw new Error('Invalid credentials')
	}
})
const profile = (req, res) => {
	res.json({message:'hellolads'})
}

module.exports = {
	signup,
	login,
	profile
}