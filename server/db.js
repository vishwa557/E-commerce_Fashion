require('dotenv').config();

// DB Connection File
const mongoose = require('mongoose');
const connectionUrl = process.env.DB_CONNECTION_STRING

async function connectToMongo() {
  try {
    await mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }
}

module.exports = connectToMongo;
