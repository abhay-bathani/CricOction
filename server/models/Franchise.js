const mongoose = require('mongoose');

const franchiseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teamName: { type: String, required: true },
  budget: { type: Number, default: 1000000 },
  squad: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Player IDs
}, { timestamps: true });

module.exports = mongoose.model('Franchise', franchiseSchema);
