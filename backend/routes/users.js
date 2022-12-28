const express = require('express');

// Router
const router = express.Router();

// Controllers
const userController = require('../controllers/user.controller');

// Routes
router.post('/register', userController.registerUser)

module.exports = router;