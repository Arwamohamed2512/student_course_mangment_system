const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.use(authMiddleware);

router.get("/:id", userController.getProfile);
router.put("/:id", userController.updateProfile);

module.exports = router;
