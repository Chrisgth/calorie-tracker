const path = require("path");
const passport = require("passport");
const bcryptjs = require('bcryptjs');
const User = require('../models/user.js')
const LocalStrategy = require("passport-local").Strategy;

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

const login = (req, res) => {

	passport.use(
		new LocalStrategy((username, password, done) => {
			User.findOne({ username: username }, (err, user) => {
				if (err) { 
					return done(err);
				}
				if (!user) {
					return done(null, false, { message: "Incorrect username" });
				}
				bcryptjs.compare(password, user.password, (err, res) => {
					if (res) {
						// passwords match! log user in
						return done(null, user)
					} else {
						// passwords do not match!
						return done(null, false, { message: "Incorrect password" })
					}
				})
			});
		})
	);

  passport.authenticate("local", {
    successRedirect: "http://localhost:3000/sign-up",
    failureRedirect: "http://localhost:3000/log-in",
		failureMessage: true
  })
}

module.exports = {
	signup,
	login
}