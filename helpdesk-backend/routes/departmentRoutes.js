const express = require("express");
const { getAllDepartments, getFilteredDepartment } = require("../controllers/departmentController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/fetchDepartments", getAllDepartments);
router.get("/getDepartments/:id", getFilteredDepartment);

module.exports = router;
