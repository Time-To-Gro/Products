const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  totalStock: Number,
  sold: Number,
  image: String,
});

module.exports = mongoose.model("Product", productSchema);
