const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 50
  },
 
});

module.exports = mongoose.model("Product", productSchema);
