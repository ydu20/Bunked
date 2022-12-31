const express = require('express');
const validate = require('../middlewares/validators');

// Router
const router = express.Router();

// Controllers
const userControllers = require('../controllers/user.controllers');

// Routes
router.post('/register', validate.validateEmail, validate.validatePassword, userControllers.registerUser)
router.post('/create-bio', validate.checkBio, userControllers.createUserBio)
router.post('/update-bio', validate.updateBio, userControllers.updateUserBio)

router.post('/test', (req, res) => {

    console.log(req.body);
    res.json("Success!")
});

module.exports = router;