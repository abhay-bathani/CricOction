const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Paused', 'Completed'],
    default: 'Not Started',
  },
  currentPlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Player in auction
  startTime: Date,
  endTime: Date,
}, { timestamps: true });

module.exports = mongoose.model('Auction', auctionSchema);
