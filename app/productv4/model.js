const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'nama harus ada'],
    minLength: 3,
    maxLength: 50,
  },
  price: {
    type: Number,
    required: true,
    min: 1000,
    max: 100000000,
  },
  stock: Number,
  status: {
    type: Boolean,
    default: true,
  },
  image_url: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;