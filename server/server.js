import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';

import authRoutes from './routes/auth.js';
import './config/passport.js';  // Passport Google OAuth setup

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Session configuration - must be before passport middleware and routes
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// CORS (can be anywhere before routes)
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

// Routes - after passport and session middleware
app.use('/auth', authRoutes);
// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
