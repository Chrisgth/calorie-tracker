const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users.js');
const trackerRoutes = require('./routes/tracker.js');
require('dotenv').config();

const server = express();

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    server.listen(process.env.PORT || 5000);
    console.log('connected to db and listening on port 5000');
  })
  .catch((err) => console.log(err));

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://chrisgth.github.io');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});

server.use('/api/user', userRoutes);
server.use('/api/tracker', trackerRoutes);
