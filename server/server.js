const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
const User = require('./models/user.js')
const userRoutes = require('./routes/users.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const server = express()

mongoose
	.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
	.then((result) => {
		server.listen(process.env.PORT || 5000);
		console.log('connected to db and listening on port 5000')
	})
	.catch(err => console.log(err))

server.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
server.use(passport.initialize());
server.use(passport.session());
server.use(express.urlencoded({ extended: false }));

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

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

server.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

server.use('/api/user', userRoutes)
