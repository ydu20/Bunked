const express = require('express');

// Router
const router = express.Router();

// Controllers
const chatController = require('../controllers/chat.controllers');

// Define routes
router.post('/message', chatController.addMessage);
router.get('/message', chatController.getMessages);

module.exports = router;