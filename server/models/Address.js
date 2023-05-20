const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    houseNumber: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "India",
    },
    zipCode: {
      type: Number,
      required: true,
    },
  });
  
  module.exports = mongoose.model("Address", addressSchema);
  