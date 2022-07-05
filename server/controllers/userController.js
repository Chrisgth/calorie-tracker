const passport = require("passport");
const bcryptjs = require('bcryptjs');
const User = require('../models/user.js')

const signup = (req, res) => {
	bcryptjs.hash(req.body.password, 10, (err, hashedPassword) => {
		if (err) {
			console.log(err)
		} else {
			const user = new User ({
				username: req.body.username,
				password: hashedPassword
			}).save(err => {
				if (err) {
					return next(err)
				}
				res.redirect('http://localhost:3000/log-in')
			})
		}
	})
};

const login = passport.authenticate("local", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "http://localhost:3000/log-in",
  })

const profile = (req, res) => {
	res.json(req.user)
}

module.exports = {
	signup,
	login,
	profile
}