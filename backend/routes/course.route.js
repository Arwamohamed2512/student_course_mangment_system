const express = require("express")
const router = express.Router()
const courseController = require("../controllers/course.controller")
const vaildtoken = require("../middlewares/auth.middleware")

router.use(vaildtoken)

router.post("/",adminmiddleware,courseController.createCourse)
router.get("/getall", courseController.getCourses)
router.get("/getbyid/:id", courseController.getCourseById)
router.delete("/:id",adminmiddleware,courseController.deleteCourse)
router.put("/:id",adminmiddleware,courseController.updateCourse)

module.exports = router
