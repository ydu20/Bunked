const express = require('express');

// Router
const router = express.Router();

// Controllers
const userControllers = require('../controllers/user.controllers');
const userImgControllers = require('../controllers/user.image.controllers');


// Middlewares
const validate = require('../middlewares/validators');
const multer = require('../middlewares/image.multer');


// Routes
router.post('/register', validate.validateEmail, validate.validatePassword, userControllers.registerUser);
router.post('/create-bio', validate.checkBio, userControllers.createUserBio);
router.post('/update-bio', validate.updateBio, userControllers.updateUserBio);
router.post('/profile-pic', multer.saveImg, userImgControllers.uploadImage);
router.get('/profile-pic', userImgControllers.getImage);
router.delete('/profile-pic', userImgControllers.deleteImage);

router.post('/test', (req, res) => {

    console.log(req.body);
    res.json("Success!")
});

router.post('/test', (req, res) => {

    console.log(req.body);
    res.json("Success!")
});

module.exports = router;