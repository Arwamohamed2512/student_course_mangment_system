const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")
const  vaildtoken  = require("../middlewares/auth.middleware")

router.use(vaildtoken)

router.get("/:id", userController.getProfile)
router.put("/:id", userController.updateProfile)

module.exports = router
