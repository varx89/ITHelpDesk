// backend/controllers/ticketController.js
const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticket");

// @desc    Create a new ticket
// @route   POST /api/tickets/create
// @access  Private (Normal User Only)
const createTicket = asyncHandler(async (req, res) => {
	const { name, department, description } = req.body;

	const ticket = await Ticket.create({
		name,
		username: req.user.username, // The logged-in user's username
		department,
		description,
		status: "new",
	});

	res.status(201).json(ticket);
});

// @desc    Get all tickets (Admin Only)
// @route   GET /api/tickets
// @access  Private (Admin Only)
const getAllTickets = asyncHandler(async (req, res) => {
	const tickets = await Ticket.findAll();
	res.json(tickets);
});

// @desc    Admin takes over a ticket
// @route   PUT /api/tickets/take/:id
// @access  Private (Admin Only)
const takeTicket = asyncHandler(async (req, res) => {
	const ticket = await Ticket.findByPk(req.params.id);

	if (!ticket) {
		res.status(404);
		throw new Error("Ticket not found");
	}

	if (ticket.status !== "new") {
		res.status(400);
		throw new Error("Ticket already taken or closed");
	}

	ticket.status = "in_progress";
	ticket.admin = req.user.username; // Admin taking over the ticket
	await ticket.save();

	res.json(ticket);
});

// @desc    Close a ticket
// @route   PUT /api/tickets/close/:id
// @access  Private (Admin Only)
const closeTicket = asyncHandler(async (req, res) => {
	const { solvingRemark } = req.body;

	const ticket = await Ticket.findByPk(req.params.id);

	if (!ticket) {
		res.status(404);
		throw new Error("Ticket not found");
	}

	if (ticket.status !== "in_progress") {
		res.status(400);
		throw new Error("Ticket is not in progress");
	}

	ticket.status = "closed";
	ticket.solvingRemark = solvingRemark;
	ticket.closedAt = new Date(); // Capture the closing time
	await ticket.save();

	res.json(ticket);
});

module.exports = {
	createTicket,
	getAllTickets,
	takeTicket,
	closeTicket,
};
