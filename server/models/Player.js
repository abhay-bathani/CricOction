const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);
