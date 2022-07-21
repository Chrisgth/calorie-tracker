const asyncHandler = require("express-async-handler");
const Plan = require("../models/plans.js");

const newPlan = asyncHandler(async (req, res) => {
  const { userID, title, description, plan } = req.body;
  if (!userID || !title) {
    res.status(400);
    throw new Error("Plan must be made by a user and contain a title");
  }
});
const getPlans = asyncHandler(async (req, res) => {
  userID = req.userID;
  if (!userID) {
    res.status(400);
    throw new Error("User ID not found");
  } else {
    const plans = await Plan.find({ userID });
    res.json({
      plans,
    });
  }
});

module.exports = { newPlan, getPlans };
