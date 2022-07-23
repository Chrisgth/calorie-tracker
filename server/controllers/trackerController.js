const asyncHandler = require("express-async-handler");
const Plan = require("../models/plans.js");

const newPlan = asyncHandler(async (req, res) => {
  const { userID, title } = req.body.params;
  if (!userID || !title) {
    res.status(400);
    throw new Error("Plan must be made by a user and contain a title");
  }

  const plan = await new Plan({
    userID,
    title,
    description: "",
  });

  plan
    .save()
    .then((response) => {
      res.status(201).json(plan);
    })
    .catch((err) => {
      res.status(400);
      throw new Error(err);
    });
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

const updatePlan = asyncHandler(async (req, res) => {
  const { plan } = req.body.params;
  console.log(plan);
  console.log(plan.plan._id);
  if (!plan) {
    res.status(400);
    throw new Error("Invalid plan");
  }
  await Plan.findByIdAndUpdate(plan._id, plan)
    .then((response) => {
      res.status(201).json("Item updated");
    })
    .catch((err) => {
      throw new Error(err);
    });
});

const deletePlan = asyncHandler(async (req, res) => {
  id = req.params.id;
  if (!id) {
    res.status(400);
    throw new Error("Invalid plan ID");
  }
  await Plan.findByIdAndDelete(id)
    .then((response) => {
      res.status(201).json("Plan deleted");
    })
    .catch((err) => {
      throw new Error(err);
    });
});
module.exports = { newPlan, getPlans, updatePlan, deletePlan };
