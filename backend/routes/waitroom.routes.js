// Routes for changes to waiting rooms
const express = require('express');

const router = express.Router();

const waitroomController = require('../controllers/waitroom.controllers');

// Define routes
router.get('/getUsers', waitroomController.getUsersInWaitingRoom); // Get all users in a given user's waiting room
router.post('/addUser', waitroomController.addToWaitingRoom); // Add a user to waiting room
router.delete('/removeUser', waitroomController.removeFromWaitingRoom); // Remove user from waiting room


module.exports = router;