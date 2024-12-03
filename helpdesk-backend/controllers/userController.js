// backend/controllers/userController.js
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { Op } = require("sequelize");

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "90d" });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { username, password, fullName, role } = req.body;
	// Check if user exists
	const userExists = (await User.findOne({ where: { username } })) ?? false;

	if (userExists) {
		return res.status(401).json({ error: "Utilizatorul exista deja!" });
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create new user
	const user = await User.create({
		username,
		password: hashedPassword,
		fullName,
		role: role || "normal", // Default to 'normal' if role is not provided
	});

	if (user) {
		res.status(201).json({
			id: user.id,
			username: user.username,
			role: user.role,
			fullName: user.fullName,
			token: generateToken(user.id),
		});
	} else {
		return res.status(401).json({ error: "Utilizator Invalid!" });
	}
});

// @desc    Authenticate a user and get token (Login)
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
	const { username, password } = req.body;

	// Check if user exists
	const user = await User.findOne({ where: { username } });

	if (user && (await bcrypt.compare(password, user.password))) {
		token = generateToken(user.id);
		res.json({
			id: user.id,
			username: user.username,
			role: user.role,
			fullName: user.fullName,
			departmentID: user.departmentID,
			token: token,
		});
		res.status(201).json({ success: "Utilizator autentificat cu success!" });
	} else {
		return res.status(409).json({ error: "Utilizator sau parola invalid(a)!" });
	}
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findAll({ where: { fullname: { [Op.like]: `%${req.params.id}%` } } });

	if (user) {
		// res.json({
		// 	id: user.id,
		// 	username: user.username,
		// 	role: user.role,
		// 	fullName: user.fullName,
		// 	departmentID: user.departmentID,
		// });
		res.json(user);
	} else {
		return res.status(404).json({ error: "Utilizator negasit!" });
	}
});

const fetchUsers = asyncHandler(async (req, res) => {
	const users = await User.findAll();
	if (!users) {
		return res.status(404).json({ error: "Nu exista utilizatori in baza de date!" });
	}
	// Return the users (without the password
	res.json(users);
});

module.exports = {
	registerUser,
	loginUser,
	getUserProfile,
	fetchUsers,
};
