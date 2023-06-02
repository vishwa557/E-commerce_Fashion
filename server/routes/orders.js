const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
const Product = require('../models/Products');
const Address = require('../models/Address');
const verifyToken = require('../middleware/verifyToken');

// Get user's orders
router.get('/orders', verifyToken, async (req, res) => {
  try { 
    const userId = req.user.id;
    const orders = await Order.find({ userId }).lean();

    for (let order of orders) {
      // Fetch product details for each order
      const productIds = order.products.map((product) => product.productId);
      const products = await Product.find({ _id: { $in: productIds } }).lean();

      // Fetch shipping address details for each order
      const shippingAddress = await Address.findById(order.shipping).lean();

      // Attach product and address details to the order
      order.products = order.products.map((product) => {
        const matchingProduct = products.find((p) => p._id.toString() === product.productId.toString());
        return {
          ...product,
          productDetails: matchingProduct,
        };
      });

      order.shippingAddress = shippingAddress;
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Cancel an order

router.delete('/orders/:orderId', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.orderId;

    // Find the order and check if it belongs to the user
    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if the order can be canceled (e.g., it's not already delivered)
    if (order.delivery_status === 'Delivered') {
      return res.status(400).json({ message: 'Cannot cancel a delivered order' });
    }

    // Update the delivery status to 'Canceled'
    order.delivery_status = 'Canceled';
    order.payment_status = 'Refunded';
    await order.save();

    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



module.exports = router;

