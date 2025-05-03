const userModel = require('../models/userModel');
const { generateToken, generateRefreshToken } = require('../utils/auth');
const { validationResult } = require('express-validator');

const login = async (req, res, next) => {
  // Validasi input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }

  const { email, password } = req.body;

  try {
    // Cek user di database
    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verifikasi password
    const isMatch = await userModel.verifyPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate tokens
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    // Response sukses
    res.json({
      success: true,
      token,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role_name
      }
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  login
};