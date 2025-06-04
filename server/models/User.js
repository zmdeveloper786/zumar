import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  phoneNumber: String,
  password:  { type: String }, // hashed password
  googleId:  { type: String }, // for Google OAuth users
  resetPasswordToken: String,
resetPasswordExpires: Date,
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);
