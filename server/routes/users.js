const express = require('express')
const userController = require('../controllers/userController.js')

const router = express.Router()

router.post('/sign-up', userController.signup)
router.post('/log-in', userController.login)
router.get('/profile', userController.profile)

module.exports = router