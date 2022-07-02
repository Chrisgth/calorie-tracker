const express = require('express')
const userController = require('../controllers/userController.js')

const router = express.Router()

router.post('/sign-up', userController.signup)
router.post('/log-in', userController.login)

module.exports = router