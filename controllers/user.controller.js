const User = require('../models/user.model');

// Get user profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) { 
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// Update user profile (Secured)
exports.updateProfile = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this profile' });
    }

    // السماح فقط بتعديل البيانات الشخصية دون الـ Role أو Password
    const { firstName, lastName, age } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, age },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    next(err);
  }
};