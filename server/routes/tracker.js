const express = require("express");
const trackerController = require("../controllers/trackerController.js");
const router = express.Router();
const { protect } = require("../middleware/authMid.js");

router.get("/get-plans", protect, trackerController.getPlans);
module.exports = router;
