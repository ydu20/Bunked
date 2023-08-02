const express = require('express');

// Router
const router = express.Router();

// Controllers
const matchingController = require('../controllers/matching.controllers');

// Define routes
router.post('/matching', matchingController.createMatching); // Create a matching
router.get('/matching', matchingController.getMatchings); // Find a user's matchings

module.exports = router;