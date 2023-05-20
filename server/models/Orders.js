const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: false,
  },
  
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  subtotal: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  shipping: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  payment_status: {
    type: String,
    required: true,
  },
  delivery_status: {
    type: String,
    enum: ['Not Processed', 'Processing', 'Out for Delivery', 'Delivered', 'Canceled'],
    default: 'Not Processed',
  },
  deliveryUpdatedAt: {
    type: Date,
    default: Date.now,
  },
  
   receipt_url: {
    type: String,
    required: true,
  },
  transaction_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});

// Update the delivery status every 10 hours
orderSchema.pre("save", function (next) {
  const now = new Date();
  const diff = now - this.deliveryUpdatedAt;
  const hoursPassed = Math.floor(diff / (1000*60*60));

  if (hoursPassed >= 10) {
    switch (this.delivery_status) {
      case "Not Processed":
        this.delivery_status = "Processing";
        break;
      case "Processing":
        this.delivery_status = "Out for Delivery";
        break;
      case "Out for Delivery":
        this.delivery_status = "Delivered";
        break;
      default:
        break;
    }
    this.deliveryUpdatedAt = now;
  }

  next();
});

module.exports = mongoose.model("Order", orderSchema);
