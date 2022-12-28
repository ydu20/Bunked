const bcrypt = require("bcrypt");
let User = require('../models/user.model');


exports.registerUser = async (req, res) => {
    console.log(req.body)
    const username = req.body.username;
    const password = req.body.password;
    const hashed = bcrypt.hashSync(password, 10);

    const newUser = new User ({
        username: username,
        password: hashed,
    });

    newUser.save().then(() => res.json('User registered!'))
        .catch(err => res.status(400).json('Error: ' + err));
    
}