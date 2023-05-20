const express = require('express');
const Address = require('../models/Address');
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/User');

const router = express.Router();


// Get user's address
router.get('/get_address', verifyToken, async (req, res) => {
    try {
      const userAddresses = await Address.find({ user: req.user.id });
      if (!userAddresses || userAddresses.length === 0) {
        return res.status(404).json({ message: 'User addresses not found' });
      }
      res.status(200).json({ addresses: userAddresses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  // GET /api/address/:id
router.get('/get_address/:id', verifyToken, async (req, res) => {
  try {
    const addressId = req.params.id;
    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.status(200).json({ address });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

  //GET user's details
 
router.get('/get_user', verifyToken, async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id).select("-password");
    if (!userDetails) {
      return res.status(404).json({ message: 'User details not found' });
    }
    res.status(200).json({ user: userDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' ,error: error });
  }
});

  

// Add user's address
router.post('/new_address', verifyToken, async (req, res) => {
    try {
      // Check if all required fields are present
      const { houseNumber, street, city, state, country, zipCode } = req.body;
      if (!houseNumber && !street && !city && !state && !country && !zipCode) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const userAddress = new Address({
        user: req.user.id,
        houseNumber: houseNumber,
        street: street,
        city: city,
        state: state,
        country: country,
        zipCode: zipCode
      });
  
      const existingAddress = await Address.findOne({
        user: req.user.id,
        houseNumber: req.body.houseNumber,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        zipCode: req.body.zipCode
      });
      
      if (existingAddress) {
        return res.status(400).json({ message: 'Address already exists' });
      }
      
      const savedAddress = await userAddress.save();
      res.status(201).json({ address: savedAddress });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

module.exports = router;
