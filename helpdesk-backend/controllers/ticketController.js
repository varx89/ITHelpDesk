// backend/controllers/ticketController.js
const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticket");
const writeLog = require("../logger");
const { Op } = require("sequelize");

// @desc    Create a new ticket
// @route   POST /api/tickets/create
// @access  Private (Normal User Only)
const createTicket = asyncHandler(async (req, res) => {
	const { name, nameAllocate, department, description } = req.body;

	if (!name) {
		return res.status(401).json({ error: "Va rog introduceti numele dumneavoastra!" });
	}

	// if (!nameAllocate) {
	// 	return res.status(401).json({ error: "Va rog sa selectati numele utilizatorului!" });
	// }
	if (!department) {
		return res.status(401).json({ error: "Va rog sa selectati departamentul!" });
	}
	if (!description) {
		return res.status(401).json({ error: "Va rog sa introduceti o descriere a problemei!" });
	}
	if (!req.user.username) {
		return res.status(401).json({ error: "Nume de utilizator invalid!" });
	}

	const ticket = await Ticket.create({
		name,
		username: req.user.username,
		nameAllocate, // The logged-in user's username
		department,
		description,
		status: "new",
	});

	res.status(201).json(ticket);
});

const getAllTickets = asyncHandler(async (req, res) => {
	const tickets = await Ticket.findAll();
	if (!tickets) {
		res.status(404).json({ error: "Nu exista tickete in baza de date!" });
	}
	res.json(tickets);
});

const getAllTicketsUser = asyncHandler(async (req, res) => {
	const username = req.params.id;

	const tickets = await Ticket.findAll({
		where: {
			username: username,
			// status: {
			// 	[Op.ne]: "closed", // Status not equal to "closed"
			// },
		},
	});
	if (!tickets) {
		res.status(404).json({ error: "Nu exista tickete in baza de date!" });
	}
	res.json(tickets);
});

const takeTicket = asyncHandler(async (req, res) => {
	const ticket = await Ticket.findByPk(req.params.id);

	if (!ticket) {
		res.status(404).json({ error: "Ticket negasit" });
		// throw new Error("Ticket not found");
	}

	if (ticket.status !== "new") {
		res.status(400).json({ error: "Ticket deja luat" });
		// throw new Error("Ticket already taken or closed");
	}

	ticket.status = "in_progress";
	ticket.admin = req.user.username; // Admin taking over the ticket
	ticket.adminFullName = req.user.fullName;
	await ticket.save();

	res.json(ticket);
});

const closeTicket = asyncHandler(async (req, res) => {
	const { solvingRemark, timeSpan } = req.body;

	const ticket = await Ticket.findByPk(req.params.id);

	if (!req.params.id.match(/[0-9]+/)) {
		res.status(400).json({ error: "Nu am gasit id-ul Ticket-ului!" });
	}

	if (!ticket) {
		res.status(404).json({ error: "Ticket de negasit!" });
	}

	if (ticket.status !== "in_progress") {
		res.status(400).json({ error: "Ticket-ul nu este in progress sau este inchis!" });
	}

	if (!solvingRemark) {
		res.status(401).json({ error: "Nu ati introdus descrierea rezolvarii Ticket-ului!" });
	}

	if (!timeSpan) {
		res.status(401).json({ error: "Nu ati introdus durata Ticket-ului!" });
	}

	ticket.status = "closed";
	ticket.solvingRemark = solvingRemark;
	ticket.timeSpan = timeSpan;
	ticket.closedAt = new Date(); // Capture the closing time
	await ticket.save();

	res.json(ticket);
});

module.exports = {
	createTicket,
	getAllTickets,
	takeTicket,
	closeTicket,
	getAllTicketsUser,
};
