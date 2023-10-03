const express = require("express");
const router = express.Router();
const userCtr = require("../controllers/userControler");
const { validateToken } = require("../middleware/jwt_authentication");

router.post("/register", userCtr.registerUser);
router.post("/login", userCtr.loginUser);
router.get("/current", validateToken, userCtr.currentUser);

module.exports = router;
