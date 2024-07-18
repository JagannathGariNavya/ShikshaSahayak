import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  facebookId: { type: String },
  role: { type: String, enum: ['student', 'donor', 'admin'], default: 'student' }
});

const User = mongoose.model('User', userSchema);
export default User;
