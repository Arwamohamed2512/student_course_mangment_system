const Course = require("../models/course.model")


// createCourse
// بيعمل إنشاء Course جديد وحفظه في MongoDB
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


// getCourses
// بيجيب كل الـ Courses الموجودة في Database
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


// getCourseById
// بيجيب Course واحد باستخدام الـ id
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


// updateCourse
// بيعمل Update للـ Course باستخدام الـ id
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


// deleteCourse
// بيحذف Course باستخدام الـ id
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