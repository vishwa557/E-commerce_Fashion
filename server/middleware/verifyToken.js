const jwt = require('jsonwebtoken');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());


const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
// console.log("\n\ntoken: ", token);
  if (!token) {
    console.log("token not present in cookie" );
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    // console.log(req.user)
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = verifyToken;
// const jwt = require('jsonwebtoken');
// const express = require('express');
// const cookieParser = require('cookie-parser');

// const app = express();

// app.use(cookieParser());

// const setTokenCookie = (res, token) => {
//   const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // Set expiration time to 24 hours from now
//   res.cookie('token', token, {
//     path: '/',
//     sameSite: 'none',
//     secure: true,
//     expires: expirationTime,
//   });
// };

// const verifyToken = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user;
//     // console.log(req.user)
//     next();
//   } catch (error) {
//     if (error.name === 'TokenExpiredError') { // check if the error is due to token expiration
//       res.clearCookie('token'); // clear the expired token cookie
//       return res.redirect('/'); // redirect to homepage
//     } else {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   }
// };

// module.exports =  verifyToken;
// module.exports = setTokenCookie;