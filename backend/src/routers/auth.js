const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  register,
  login,
  refresh,
} = require("../controllers/auth");
const {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
} = require("../validators/auth");
const checkErrors = require("../validators/checkErrors");

router.get("/users", getAllUsers);
router.put("/register", validateRegistrationData, checkErrors, register);
router.post("/login", validateLoginData, login);
router.post("/refresh", validateRefreshToken, checkErrors, refresh);

module.exports = router;
