import jwt from 'jsonwebtoken';
import { fileDB } from '../utils/fileDB.js';

// Simple mock for bcrypt since we don't need real hashing for a demo DB
const mockHash = (password) => Buffer.from(password).toString('base64');

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, age, gender, bloodGroup, nationality, phone, emergencyContact, verificationId, allergies, existingConditions, medications, reports } = req.body;

    const userExists = fileDB.findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = fileDB.saveUser({
      name, email, password: mockHash(password), role: role || 'user',
      age, gender, bloodGroup, nationality, phone, emergencyContact, verificationId, allergies, existingConditions, medications, reports,
      isOnboarded: true
    });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      isOnboarded: true,
      token: generateToken(newUser._id, newUser.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = fileDB.findUserByEmail(email);

    if (user && user.password === mockHash(password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isOnboarded: user.isOnboarded || false,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = fileDB.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isOnboarded: user.isOnboarded,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { emailOrPhone } = req.body;
    // For this simple mock, we'll assume emailOrPhone matches the user's email or phone exactly
    const user = fileDB.getUsers().find(u => u.email === emailOrPhone || u.phone === emailOrPhone);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.resetOtp = otp;
    user.resetOtpExpiry = expiry;
    fileDB.saveUser(user);

    // MOCK SENDING OTP: We just return it in the response for demo purposes
    res.json({ message: 'OTP generated successfully', mockOtp: otp });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { emailOrPhone, otp } = req.body;
    const user = fileDB.getUsers().find(u => u.email === emailOrPhone || u.phone === emailOrPhone);

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.resetOtp || user.resetOtp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    if (Date.now() > user.resetOtpExpiry) return res.status(400).json({ message: 'OTP expired' });

    // OTP matches. Generate a temporary reset token.
    const resetToken = Math.random().toString(36).substring(2, 15);
    user.resetToken = resetToken;
    fileDB.saveUser(user);

    res.json({ message: 'OTP verified', resetToken });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { emailOrPhone, resetToken, newPassword } = req.body;
    const user = fileDB.getUsers().find(u => u.email === emailOrPhone || u.phone === emailOrPhone);

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.resetToken || user.resetToken !== resetToken) return res.status(400).json({ message: 'Invalid or expired reset token' });

    // Update password
    user.password = mockHash(newPassword);
    
    // Clear reset tokens
    user.resetOtp = undefined;
    user.resetOtpExpiry = undefined;
    user.resetToken = undefined;
    
    fileDB.saveUser(user);

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
