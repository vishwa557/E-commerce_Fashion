const express = require("express");
const Stripe = require("stripe");
const Order = require("../models/Orders");
const Address = require("../models/Address");
const Product = require("../models/Products");
const verifyToken = require('../middleware/verifyToken');


require('dotenv').config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post("/create-checkout-session", verifyToken, async (req, res) => {
  console.log(req.body.cartItems);
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.user.id,
      cart: JSON.stringify(req.body.cartItems),
      selectedAddressId: req.body.selectedAddress,
    },
  });


  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer: customer.id,
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cart",
  });

  // Return the session URL to the client
  res.send({ url: session.url });
});

// Webhook endpoint to handle the event when payment is successful or fails
router.post("/webhook", express.json({ type: "application/json" }), async (req, res) => {
  let data;
  let eventType;

  // Check if webhook signing is configured.
  let webhookSecret;
  webhookSecret = process.env.STRIPE_WEB_HOOK;

  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed:  ${err}`);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data.object;
    eventType = event.type;
  } else {
    // retrieve the event data directly from the request body.
    data = req.body.data.object;
    eventType = req.body.type;
  }


  // Handle the payment_intent.succeeded event
  if (eventType === "charge.succeeded") {
    // console.log("data:",data);

    stripe.customers.retrieve(data.customer).then(async (customer) => {
        try {
          createOrder(customer, data, "paid");
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err.message));
  }

  // Handle the payment_intent.payment_failed event
  if (eventType === "payment_intent.payment_failed") {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer) => {
        try {
          createOrder(customer, data, "failed");
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err.message));
  }

  res.status(200).end();
});

// Create order function
const createOrder = async (customer, data, paymentStatus) => {
  const Items = JSON.parse(customer.metadata.cart);
  const selectedAdId = customer.metadata.selectedAddressId;
  const selectedAddress = await Address.findOne({ _id: selectedAdId });

  const products = await Promise.all(
    Items.map(async (item) => {
      const product = await Product.findOne({ _id: item._id });
      return {
        productId: item._id,
        quantity: item.quantity,
        unit_price: product.price,
      };
    })
  );

  const totalAmount = products.reduce(
    (total, item) => total + item.unit_price * item.quantity,
    0
  );

  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    products,
    subtotal: totalAmount,
    total: totalAmount,
    shipping: selectedAddress,
    payment_status: paymentStatus, // Set the payment status based on the argument
    delivery_status: "Not Processed",
    receipt_url: data.receipt_url,
    transaction_id: data.payment_intent,
  });

  try {
    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
  } catch (err) {
    console.log(err);
  }
};

module.exports = router;