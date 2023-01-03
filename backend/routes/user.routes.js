const express = require('express');

// Router
const router = express.Router();

// Controllers
const userControllers = require('../controllers/user.controllers');
const userImgControllers = require('../controllers/user.image.controllers');

// Scripts
const recommender = require('../scripts/recommender');

// Middlewares
const validate = require('../middlewares/validators');
const multer = require('../middlewares/image.multer');

// Authorization function
var authorizeUser = async (req, res, next) => {
    if (req.session.user && req.session.email 
        && req.session.user.email == req.body.email) {
        next();
      } else {
        return res.status(401).json('Unauthorized.')
    }
}


// Routes
router.post('/register', validate.validateEmail, validate.validatePassword, userControllers.registerUser);
router.post('/create-bio', validate.checkBio, userControllers.createUserBio);
router.post('/update-bio', validate.updateBio, userControllers.updateUserBio);
router.post('/profile-pic', multer.saveImg, userImgControllers.uploadImage);
router.get('/profile-pic', userImgControllers.getImage);
router.delete('/profile-pic', userImgControllers.deleteImage);
router.post('/login', userControllers.loginUser);
router.delete('/logout', userControllers.logoutUser);

router.post('/test', authorizeUser, (req, res) => {
    console.log(req.body);
    res.json("Success!");
});


// Extra test route used by Freddy
router.post('/test2', async (req, res) => {
    const t1 = performance.now();
    const mdl = req.app.get('encoder');
    const embeds = await recommender.embed(mdl, ['this', 'basketball'])
    const t2 = performance.now();
    console.log(t2-t1);
    res.json(embeds);
});

module.exports = router;