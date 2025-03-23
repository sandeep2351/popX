
const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// @route   GET api/users
// @desc    Get all users
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(500).send('Server error');
  }
});

// @route   PUT api/users/:id
// @desc    Update user
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { fullName, phoneNumber, email, companyName, isAgency, avatar } = req.body;
  
  // Build user object
  const userFields = {};
  if (fullName) userFields.fullName = fullName;
  if (phoneNumber) userFields.phoneNumber = phoneNumber;
  if (email) userFields.email = email;
  if (companyName) userFields.companyName = companyName;
  if (isAgency) userFields.isAgency = isAgency;
  if (avatar) userFields.avatar = avatar;
  
  try {
    let user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Make sure user owns the profile
    if (user._id.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
