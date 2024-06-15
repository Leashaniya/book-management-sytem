const express = require("express");
const router = express.Router();
const {
  customerLogin,
  getUserById,
  customerRegister,
} = require("../controllers/User.controller");
const { customerAuthentication } = require("../middleware/authMiddleware");

// Register a new customer
router.post("/signup", customerRegister);
// Login a user
router.post("/login", customerLogin);
// Get user by ID
router.get("/get/:id", getUserById);

module.exports = router;
