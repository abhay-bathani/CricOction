const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Player being bid on
  franchise: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Franchise placing bid
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Bid', bidSchema);