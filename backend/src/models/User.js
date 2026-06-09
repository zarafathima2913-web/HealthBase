import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'doctor', 'admin'], 
    default: 'user' 
  },
  profileImage: { type: String, default: '' },
  
  // Onboarding details
  age: { type: Number },
  gender: { type: String },
  bloodGroup: { type: String },
  nationality: { type: String },
  phone: { type: String },
  emergencyContact: { type: String },
  allergies: { type: String },
  existingConditions: { type: String },
  
  // Optional Athlete Info
  isAthlete: { type: Boolean, default: false },
  sport: { type: String },
  
  isOnboarded: { type: Boolean, default: false }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
