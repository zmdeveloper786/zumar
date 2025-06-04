import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import nodemailer from 'nodemailer';


const router = express.Router();


function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
}
// Google OAuth login
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false,
}));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    // req.user contains authenticated user info
    const user = req.user;

    // Generate your token here (e.g., JWT)
    const token = generateToken(user);  // <-- your custom function to create token

    // Build redirect URL with token and user info
    const redirectUrl = `${process.env.CLIENT_URL}/home?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`;
    res.redirect(redirectUrl);
  }
);


// Email/password login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Please provide email and password' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error occurred' });
  }
});

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    // Detailed validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: 'Missing required fields',
        details: {
          firstName: !firstName ? 'First name is required' : null,
          lastName: !lastName ? 'Last name is required' : null,
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword
    });

    // Generate token for immediate login
    const token = generateToken(user);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    res.status(200).json({ message: 'Email verified' });
  } catch (err) {
    console.error('Forgot password error:', err); // 👈 Add this line
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error resetting password' });
  }
});
export default router;

