const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { loginValidation } = require('../middlewares/validators/authValidator');
const { loginLimiter } = require('../middlewares/rateLimit');

router.post('/login', loginLimiter, loginValidation, authController.login);

module.exports = router;