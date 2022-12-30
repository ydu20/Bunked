const bcrypt = require("bcrypt");
let User = require('../models/user.model');
const validate = require("../middlewares/validators");


exports.registerUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const hashed = bcrypt.hashSync(password, 10);
    
    // Check if params meet validation requirements
    const validationErrors = validate.validationResult(req);
    const errors = [];

    if (!validationErrors.isEmpty) {
        validationErrors.errors.forEach((error) => {
          errors.push(error.param);
        });
    }

    if (errors.length) {
        return res.status(400).json({
          error: errors,
        });
    }

    // Register new user
    const newUser = new User ({
        email: email,
        password: hashed,
    });

    newUser.save().then(() => res.json('User registered!'))
        .catch(err => res.status(400).json('Error: ' + err));
    
}

exports.createUserBio = async (req, res) => {
    try {
        const email = req.body.email;
        const gender = req.body.gender;
        const majors = JSON.parse(req.body.majors);
        const extroversion = req.body.extroversion;
        const cleaniness = req.body.cleaniness;
        const noise = req.body.noise;
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
}