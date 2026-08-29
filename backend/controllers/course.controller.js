const Course = require("../models/course.model")
// Create Course
exports.createCourse = async (req, res, next) => {
    try {
        const { title, description, instructor, duration, price, capacity } = req.body
        const course = new Course({
            title,
            description,
            instructor,
            duration,
            price,
            capacity
        })
        await course.save()
        res.status(201).json({
            msg: "course created successfully",
            course: course
        })
    } catch (err) {
        next(err)
    }
}
// Get All Courses
exports.getCourses = async (req, res, next) => {
    try {
        const courses = await Course.find()
        res.status(200).json({
            courses: courses
        })
    } catch (err) {
        next(err)
    }
}
// Get Course By ID
exports.getCourseById = async (req, res, next) => {
    try {
        const { id } = req.params
        const course = await Course.findById(id)
        if (!course) {
            return res.status(404).json({
                msg: "course not found"
            })
        }
        res.status(200).json({
            course: course
        })
    } catch (err) {
        next(err)
    }
}
// Get Courses By Title (Query)
exports.getCoursesByTitle = async (req, res, next) => {
    try {
        const title = req.query.title
        const courses = await Course.find({ title: title })
        res.status(200).json({
            courses: courses
        })

    } catch (err) {
        next(err)
    }
}
// Update Course
exports.updateCourse = async (req, res, next) => {
    try {
        const { id } = req.params
        const { title, description, instructor, duration, price, capacity } = req.body
        const course = await Course.findByIdAndUpdate(
            id,
            {
                title,
                description,
                instructor,
                duration,
                price,
                capacity
            },
            {
                new: true,
                runValidators: true
            }
        )
        if (!course) {
            return res.status(404).json({
                msg: "course not found"
            })
        }
        res.status(200).json({
            msg: "course updated successfully",
            course: course
        })
    } catch (err) {
        next(err)
    }
}
// Delete Course
exports.deleteCourse = async (req, res, next) => {
    try {
        const { id } = req.params
        const course = await Course.findByIdAndDelete(id)
        if (!course) {
            return res.status(404).json({
                msg: "course not found"
            })
        }
        res.status(200).json({
            msg: "course deleted successfully"
        })
    } catch (err) {
        next(err)
    }
}