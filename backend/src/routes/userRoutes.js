const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const checkJwt = require("../middlewares/authMiddleware");

router.get("/user", checkJwt, userController.verifyUser);
router.get("/user/myprofile", checkJwt, userController.getProfile)
router.post('/register',checkJwt, userController.registerUser)

module.exports = router;