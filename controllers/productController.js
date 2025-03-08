const Product = require("../models/Product");

// Add multiple products (Bulk Insert)
exports.addProducts = async (req, res) => {
  try {
    const products = req.body;
    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products provided" });
    }

    await Product.insertMany(products);
    res.status(201).json({ message: "Products added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
