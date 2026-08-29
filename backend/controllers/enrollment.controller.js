const Enrollment = require('../models/enrollment.model');
const course= require('../models/course.model')


//  adds enrolemnt method -> post, path -> /enrollmets
exports.enroll = async (req, res, next) => {
  try {
    const courseId = req.body.courseId;
    const userId = req.user.id; 

    // checks if the course exists or not 
    const findcourse = await course.findById(courseId)
    if (!findcourse)return res.status(404).json({msg:"course not found "})

    // checks if user in enrolled or not 

    const existing = await Enrollment.findOne({ userId, courseId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Already enrolled in this course' });
    }

    const enrollment = await Enrollment({ userId, courseId });
    await enrollment.save()
    res.status(201).json({ success: true, enrollment });
  } catch (err) {
    next(err);
  }
};


// gets all the user enrolment method ->get -> path / getall
exports.getMyEnrollments = async (req, res,next) => {  
  try {
    const enrollments = await Enrollment.find({ user: req.user.id }).populate('course');
    res.status(200).json({ success: true, count: enrollments.length, enrollments });
  } catch (err) {
    next(err);
  }
};


// cancels  enrolment  method -> delet  path ->:id
exports.cancelEnrollment = async (req, res,next) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
    }

    // makes sure that the same  how enroller is the smae who wants to delet it by the user id 
    if (enrollment.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this enrollment' });
    }

    await enrollment.deleteOne();
    res.json({ success: true, message: 'Enrollment cancelled' });
  } catch (err) {
    next(err);
  }
};