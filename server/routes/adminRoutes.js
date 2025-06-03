const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, requireRole } = require('../middleware/authMiddleware');

// GET: All pending users (players/franchises)
router.get('/pending', protect, requireRole('Admin'), async (req, res) => {
  const users = await User.find({ isApproved: false });
  res.json(users);
});

// PATCH: Approve a user
router.patch('/approve/:id', protect, requireRole('Admin'), async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.isApproved = true;
  await user.save();

  res.json({ message: 'User approved successfully' });
});

// PATCH: Reject (delete) a user
router.delete('/reject/:id', protect, requireRole('Admin'), async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  await user.deleteOne();
  res.json({ message: 'User rejected and removed' });
});

module.exports = router;
