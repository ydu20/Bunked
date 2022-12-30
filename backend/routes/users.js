const express = require('express');
const validate = require('../middlewares/validators');

// Router
const router = express.Router();

// Controllers
const userController = require('../controllers/user.controller');

// Routes
router.post('/register', validate.validateEmail, validate.validatePassword, userController.registerUser)

module.exports = router;