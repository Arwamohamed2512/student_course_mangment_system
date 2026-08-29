const Course = require("../models/course.model")


// createCourse  admin only
// بيعمل إنشاء Course جديد وحفظه في MongoDB
exports.createCourse = async (req, res, next) => {
    try {

        // البيانات دي بتيجي من req.body
        // يعني لازم تتبعت من Postman أو Frontend في body
        const { title, description, instructor, duration, price, capacity } = req.body

        // بنعمل object جديد من Course Model
        // Course جاي من ../models/course.model
        const course = new Course({
            title,
            description,
            instructor,
            duration,
            price,
            capacity
        })

        // حفظ الـ course في MongoDB
        // الـ validation اللي موجود في course.model بيشتغل هنا
        await course.save()

        res.status(201).json({
            msg: "course created successfully",
            course: course
        })

    } catch (err) {

        // بنبعت الخطأ للـ global error handling middleware
        next(err)
    }
}


// getCourses   public 
// بيجيب كل الـ Courses الموجودة في Database
exports.getCourses = async (req, res, next) => {
    try {

        // Course.find() بتجيب كل الـ documents الموجودة في courses collection
        const courses = await Course.find()

        res.status(200).json({
            courses: courses
        })

    } catch (err) {

        // إرسال الخطأ للـ global error middleware
        next(err)
    }
}


// getCourseById   public 
// بيجيب Course واحد باستخدام الـ id
exports.getCourseById = async (req, res, next) => {
    try {

        // الـ id جاي من URL
        const { id } = req.params

        // البحث عن Course باستخدام الـ id
        const course = await Course.findById(id)

        // لو مفيش Course بالـ id ده
        if (!course) {
            return res.status(404).json({
                msg: "course not found"
            })
        }

        res.status(200).json({
            course: course
        })

    } catch (err) {

        // إرسال الخطأ للـ global error middleware
    }
}