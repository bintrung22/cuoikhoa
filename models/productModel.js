const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  nameProduct: { type: String, require: true },
  imageProduct: [{ type: String, require: true }],
  descriptionProduct: { type: String, require: true },
  quantityProduct: { type: Number, require: true },
  weightProduct: { type: Number, require: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
