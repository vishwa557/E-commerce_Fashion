require('dotenv').config({path: '../.env'});
const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
 // Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const connectToMongo = require('./db')
connectToMongo()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});


app.use(cookieParser());

// Routes
const userRoutes = require('./models/User');
const authRoutes = require('./routes/auth');
const loginRoutes = require('./routes/login');
const addressRoutes = require('./routes/address');
const productsRoutes = require('./routes/products');
const paymentRoutes = require('./routes/payment');
const orderRoutes = require('./routes/orders');

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/login', loginRoutes);
app.use('/api', addressRoutes);
app.use('/api', productsRoutes);
app.use('/api', paymentRoutes);
app.use('/api', orderRoutes);

// app.use('/api/checkout', checkoutRoutes);
// Database Connection


// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
module.exports = app;