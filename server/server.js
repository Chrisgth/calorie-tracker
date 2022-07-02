const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const server = express()

mongoose
	.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
	.then((result) => {
		server.listen(process.env.PORT || 5000);
		console.log('connected to db and listening on port 5000')
	})
	.catch(err => console.log(err))

server.set("view engine", "ejs")