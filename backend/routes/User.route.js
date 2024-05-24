const express = require("express");
const router = express.Router();
const {
  customerLogin,
  logoutUser,
  getUserById,
  customerRegister,
} = require("../controllers/User.controller");
// const { protect } = require("../middleware/authMiddleware");
// const { customerAuthentication } = require("../middleware/authentication");

// Register a new customer
router.post("/register-customer", customerRegister);
// Login a user
router.post("/login-customer", customerLogin);
// Logout a user
router.post("/logout", logoutUser);
// Get user by ID
router.get("/get/:id", getUserById);

module.exports = router;
