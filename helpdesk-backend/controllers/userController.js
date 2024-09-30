// backend/controllers/userController.js
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { username, password, fullName, role } = req.body;
	// Check if user exists
	const userExists = (await User.findOne({ where: { username } })) ?? false;
	// console.log(username, "ssss");

	if (userExists) {
		console.log("Not found!");
	} else {
		console.log(userExists instanceof User); // true
		console.log(userExists.username); // 'My Title'
	}

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
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
		res.status(400);
		throw new Error("Invalid user data");
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
		res.json({
			id: user.id,
			username: user.username,
			role: user.role,
			fullName: user.fullName,
			token: generateToken(user.id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid username or password");
	}
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findByPk(req.user.id);

	if (user) {
		res.json({
			id: user.id,
			username: user.username,
			role: user.role,
			fullName: user.fullName,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

const fetchUsers = asyncHandler(async (req, res) => {
	const users = await User.findAll();
	res.json(users);
});

module.exports = {
	registerUser,
	loginUser,
	getUserProfile,
	fetchUsers,
};
