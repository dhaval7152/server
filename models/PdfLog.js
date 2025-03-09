const mongoose = require("mongoose");

const PdfLogSchema = new mongoose.Schema({
  user: { type: String, required: true },
  filePath: { type: Buffer, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PdfLog", PdfLogSchema);
