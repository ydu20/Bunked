const express = require('express');

// Router
const router = express.Router();

// Controllers
const userControllers = require('../controllers/user.controllers');
const userImgControllers = require('../controllers/user.image.controllers');


// Middlewares
const validate = require('../middlewares/validators');
const multer = require('../middlewares/image.multer');

// Authorization function
var authorizeUser = async (req, res, next) => {
    if (req.session.user && req.session.user.email) {
        if (req.method === "POST") {
            if (req.body.email && req.session.user.email == req.body.email) {
                next();
            } else {
                return res.status(401).json('Unauthorized.')
            }
        } else {
            if (req.query.email && req.query.email == req.session.user.email) {
                next();
            } else {
                return res.status(401).json('Unauthorized.')
            }
        }
      } else {
        return res.status(401).json('Unauthorized.')
    }
}


// Routes
router.post('/register', validate.validateEmail, validate.validatePassword, userControllers.registerUser);
router.post('/create-bio', authorizeUser, validate.checkBio, userControllers.createUserBio);
router.post('/update-bio', authorizeUser, validate.updateBio, userControllers.updateUserBio);
router.post('/profile-pic', authorizeUser, multer.saveImg, userImgControllers.uploadImage);
router.get('/profile-pic', authorizeUser, userImgControllers.getImage);
router.delete('/profile-pic', authorizeUser, userImgControllers.deleteImage);
router.post('/login', userControllers.loginUser);
router.delete('/logout', userControllers.logoutUser);

router.get('/test', authorizeUser, (req, res) => {
    if (req.session.user) {
        res.json('Logged in as ' + req.session.user);
    } else {
        res.json('Not logged in.');
    }
});

module.exports = router;