const express = require("express");
const trackerController = require("../controllers/trackerController.js");
const router = express.Router();
const { protect } = require("../middleware/authMid.js");

router.get("/getPlans", protect, trackerController.getPlans);
module.exports = router;
