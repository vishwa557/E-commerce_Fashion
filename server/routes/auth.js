const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    // Check if the email or phone already exists
    const emailExist = await User.findOne({ email: req.body.email });
    const phoneExist = await User.findOne({ phone: req.body.phone });
    if (emailExist || phoneExist) {
      return res.status(400).send({ status: 'error', message: 'User already exists. Please login' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword
    });

    // Save the user to the database
    await user.save();

    // Send response
    res.status(201).send({ status: 'success', message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    // Check if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ status: 'error', message: 'Invalid email or password' });
    }

    // Compare the password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).send({ status: 'error', message: 'Invalid email or password' });
    }

    res.status(200).send({ status: 'success', message: 'Logged in successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
});

module.exports = router;
