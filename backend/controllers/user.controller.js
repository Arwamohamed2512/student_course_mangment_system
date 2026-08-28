const User = require('../models/user.model');

// get user profile path{  get ->users / :id }
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); //exclude the password from returning from data base
    if (!user) { //user non execting 
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

//  update ser profile  and (PUT /users/:id)
exports.updateProfile = async (req, res, next) => {
  try {
    
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this profile' });
    }

    const newupdat= req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      newupdat,
      { new: true,  } //returning the new updated data
    ).select('-password');

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    next(err);
  }
};