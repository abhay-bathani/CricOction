const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['Player', 'Franchise', 'Admin'], required: true },
  isApproved: { type: Boolean, default: false },

  playerProfile: {
    role: String,
    basePrice: Number,
    stats: {
      matches: Number,
      runs: Number,
      wickets: Number,
    },
    soldTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Franchise
    auctionStatus: {
      type: String,
      enum: ['Pending', 'In Auction', 'Sold', 'Unsold'],
      default: 'Pending',
    },
  },

  franchiseProfile: {
    teamName: String,
    budget: { type: Number, default: 1000000 },
    squad: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Players
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
