const express = require("express");
const trackerController = require("../controllers/trackerController.js");
const router = express.Router();
const { protect } = require("../middleware/authMid.js");

router.get("/get-plans", protect, trackerController.getPlans);
router.post("/new-plan", protect, trackerController.newPlan);
module.exports = router;
