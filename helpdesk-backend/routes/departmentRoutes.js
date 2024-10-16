const express = require("express");
const { getAllDepartments } = require("../controllers/departmentController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/fetchDepartments", getAllDepartments);

module.exports = router;
