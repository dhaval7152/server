const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  size: { type: String, required: true },
  thickness: { type: String, required: true },
  finish_type: { type: String, required: true },
  product_image: { type: String, required: true },
  preview_image: { type: String, required: true },
});

module.exports = mongoose.model("Product", ProductSchema);
