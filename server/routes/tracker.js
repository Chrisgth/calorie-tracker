const express = require('express')
const trackerController = require('../controllers/trackerController.js')
const router = express.Router()
const {protect} = require('../middleware/authMid.js')

router.get('/home', protect, trackerController.home_index)

module.exports = router