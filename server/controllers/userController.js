const bcryptjs = require("bcryptjs");
const User = require("../models/user.js");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Plan = require("../models/plans.js");

const signup = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Please fill out all the fields");
  }

  if (username.length > 15 || password.length > 30) {
    res.status(400);
    throw new Error("Inputs do not pass validation");
  }

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const user = await new User({
    username,
    password: hashedPassword,
  });

  const defaultPlan = await new Plan({
    userID: user.id,
    title: "Default plan",
    description: "",
    plan: {
      breakfast: [],
      lunch: [],
      dinner: [],
    },
  });

  defaultPlan
    .save()
    .then((response) => {})
    .catch((err) => {
      res.status(400);
      throw new Error(err);
    });

  user
    .save()
    .then((response) => {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        token: generateToken(user._id),
      });
    })
    .catch((err) => {
      res.status(400);
      throw new Error(err);
    });
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && (await bcryptjs.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
const profile = (req, res) => {
  const user = req.user;
  res.status(200).json({
    user,
  });
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = {
  signup,
  login,
  profile,
};
