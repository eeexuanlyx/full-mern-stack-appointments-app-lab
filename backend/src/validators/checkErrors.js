const { validationResult } = require("express-validator");

const checkErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ status: "error", msg: errors.array() });
  } else {
    next();
  }
};

module.exports = checkErrors;
