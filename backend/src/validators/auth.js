const { body } = require("express-validator");

const validateRegistrationData = [
  body("email", "valid email is required").notEmpty().isEmail(),
  body("password", "password is required with min length of 12")
    .notEmpty()
    .isLength({ min: 12 }),
];

const validateLoginData = [
  body("email", "valid email is required").notEmpty().isEmail(),
  body("password", "password is required.").notEmpty(),
];

const validateRefreshToken = [
  body("refresh", "valid refresh token is required").notEmpty().isJWT(),
];

module.exports = {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
};
