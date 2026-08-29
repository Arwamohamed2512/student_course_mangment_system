const express = require("express")
const router = express.Router()
const enrollmentController = require("../controllers/enrollment.controller")
const  vaildtoken = require("../middlewares/auth.middleware")

router.use(vaildtoken)

router.post("/", enrollmentController.enroll)
router.get("/getall", enrollmentController.getMyEnrollments)
router.delete("/:id", enrollmentController.cancelEnrollment)

module.exports = router
