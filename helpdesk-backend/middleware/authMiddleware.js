// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user"); // Assuming User model is defined in models/index.js

// Middleware to protect routes and authenticate users
const protect = asyncHandler(async (req, res, next) => {
	let token;

	// Check if Authorization header exists and starts with "Bearer"
	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		try {
			// Get token from header
			token = req.headers.authorization.split(" ")[1];

			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Get the user from the token and attach to req.user
			req.user = await User.findByPk(decoded.id);

			if (!req.user) {
				res.status(401).json({ error: "Access neautorizat, va rugam dati refresh!" });
			}

			next(); // Proceed to the next middleware or route handler
		} catch (error) {
			console.error(error);
			res.status(401).json({ error: "Access neautorizat, va rugam dati refresh!" });
		}
	}

	if (!token) {
		res.status(401).json({ error: "Access neautorizat, va rugam dati refresh!" });
	}
});

// Middleware to allow only normal users
const normalUserOnly = (req, res, next) => {
	if (req.user && req.user.role === "normal") {
		next(); // Proceed if the user is normal
	} else {
		res.status(403).json({ message: "Access denied. Only normal users can create tickets." });
	}
};

// Middleware to allow only admin users
const adminOnly = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		next(); // Proceed if the user is admin
	} else {
		res.status(403).json({ message: "Access denied. Admins only." });
	}
};

const normalAndAdminOnly = (req, res, next) => {
	if (req.user && (req.user.role === "normal" || req.user.role === "admin")) {
		next(); // Proceed if the user is normal or admin
	} else {
		res.status(403).json({ message: "Access denied. Normal users and admins only." });
	}
};

module.exports = { protect, normalUserOnly, adminOnly, normalAndAdminOnly };
