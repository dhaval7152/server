const express = require("express");
const { generatePDF } = require("../controllers/pdfController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate", authMiddleware, generatePDF);

module.exports = router;
