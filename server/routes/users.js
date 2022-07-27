const express = require('express');
const userController = require('../controllers/userController.js');

const router = express.Router();
const { protect } = require('../middleware/authMid.js');

router.post('/sign-up', userController.signup);
router.post('/log-in', userController.login);
router.get('/profile', protect, userController.profile);

module.exports = router;
