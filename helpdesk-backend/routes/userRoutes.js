const express = require("express");
const { registerUser, loginUser, getUserProfile, fetchUsers } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/fetchUsers", fetchUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;
