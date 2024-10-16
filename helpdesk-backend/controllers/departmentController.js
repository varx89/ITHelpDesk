// backend/controllers/ticketController.js
const asyncHandler = require("express-async-handler");
const Department = require("../models/department");
const writeLog = require("../logger");

// @desc    Get all tickets (Admin Only)
// @route   GET /api/tickets
// @access  Private (Admin Only)
const getAllDepartments = asyncHandler(async (req, res) => {
	const departments = await Department.findAll();
	if (!departments) {
		res.status(404).json({ error: "Nu exista departamente in baza de date!" });
	}
	res.json(departments);
});

module.exports = { getAllDepartments };
