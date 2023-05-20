const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Login user
router.post('/login', async (req, res) => {
  
  try {
    // Check if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and sign the JWT token
    const payload = {
      user: {
        id: user.id
      }
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    req.cookies.token = token;
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
