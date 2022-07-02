const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
require('dotenv').config()

const server = express()

mongoose
	.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
	.then((result) => {
		server.listen(process.env.PORT || 5000);
		console.log('connected to db and listening on port 5000')
	})
	.catch(err => console.log(err))

