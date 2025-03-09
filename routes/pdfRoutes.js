const express = require("express");
const { generatePDF, dowloadPdf } = require("../controllers/pdfController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate", authMiddleware, generatePDF);
router.get("/dowloadPdf/:id", authMiddleware, dowloadPdf);

module.exports = router;
