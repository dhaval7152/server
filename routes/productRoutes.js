const express = require("express");
const {
  addProducts,
  getProducts,
} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addProducts); // Add products (When required only)
router.get("/getProducts", authMiddleware, getProducts); // Fetch all products

module.exports = router;
