const express = require("express");
const {
  register,
  login,
  getProfile,
  verifyToken,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile); // Protected route
router.post("/verify-token", verifyToken);
module.exports = router;
