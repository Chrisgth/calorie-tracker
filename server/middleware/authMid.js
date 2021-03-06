const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.js');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      req.userID = decoded.id;

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Insufficient authorization');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Token not found');
  }
});

module.exports = { protect };
