const Enrollment = require("../models/enrollment.model")
const Course = require("../models/course.model")

exports.enroll = async (req, res, next) => {
    try {
        const { courseId } = req.body
        const userId = req.user.id

        if (!courseId) {
            return res.status(400).json({ success: false, message: "courseId is required" })
        }

        const foundCourse = await Course.findById(courseId)
        if (!foundCourse) {
            return res.status(404).json({ success: false, message: "Course not found" })
        }

        const existing = await Enrollment.findOne({ userId, courseId, status: "active" })
        if (existing) {
            return res.status(409).json({ success: false, message: "Already enrolled in this course" })
        }

<<<<<<< HEAD
        const enrollment = await Enrollment.create({ userId, courseId, status: "active" });
=======                         
        const enrollment = await Enrollment.create({ userId, courseId, status: "active" })
>>>>>>> eb2ec79be83bc972395df6651f3816b347bb768e
        return res.status(201).json({ success: true, enrollment })
    } catch (error) {
        next(error)
    }
}

exports.getMyEnrollments = async (req, res, next) => {
    try {
        const enrollments = await Enrollment.find({ userId: req.user.id })
            .populate("courseId")
            .sort({ enrolledAt: -1 })

        return res.status(200).json({
            success: true,
            count: enrollments.length,
            enrollments
        })
    } catch (error) {
        next(error)
    }
}

exports.cancelEnrollment = async (req, res, next) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id)

        if (!enrollment) {
            return res.status(404).json({ success: false, message: "Enrollment not found" })
        }

        if (enrollment.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to cancel this enrollment"
            })
        }

        enrollment.status = "cancelled"
        await enrollment.save()

        return res.status(200).json({
            success: true,
            message: "Enrollment cancelled",
            enrollment
        })
    } catch (error) {
        next(error)
    }
}
