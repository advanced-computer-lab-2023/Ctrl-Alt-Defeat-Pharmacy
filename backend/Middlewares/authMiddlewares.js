const Patient = require('../Models/Patient');
const Pharmacist = require('../Models/Pharmacist');
const Admin = require('../Models/Admin');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  console.log(token == null);
  if (!token) {
    return next(new Error(`your're not logged in. Please log in`));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log('role: ' + decoded.role);
  let currentUser;
  if (decoded.role === 'pharmacist') currentUser = await Pharmacist.findById(decoded.id);
  else if (decoded.role === 'patient') currentUser = await Patient.findById(decoded.id);
  else currentUser = await Admin.findById(decoded.id);

  if (!currentUser) {
    res.status(404).json({
      message: `this user doesn't exist`,
    });
  } else {
    req.user = currentUser;
    next();
  }
};

exports.restrictTo = (...roles) => {
  return async (req, res, next) => {
    const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
    if (!roles.includes(decoded.role)) {
      res.status(401).json({
        message: "your're not authorized to access this route",
      });
    } else {
      next();
    }
  };
};
