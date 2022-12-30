const { body, validationResult } = require("express-validator");

module.exports.validateEmail = body("email").isEmail().normalizeEmail().withMessage("Please enter a valid email address.")

module.exports.validatePassword = body("password").isLength({min:8}).trim().withMessage("The password has to be at least 8 character long.");

module.exports.validationResult = validationResult;
