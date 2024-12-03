// backend/routes/ticketRoutes.js
const express = require("express");
const { protect, normalAndAdminOnly, adminOnly } = require("../middleware/authMiddleware");
const { createTicket, getAllTickets, takeTicket, closeTicket, getAllTicketsUser } = require("../controllers/ticketController");
const router = express.Router();

router.post("/create", protect, normalAndAdminOnly, createTicket);
router.get("/", protect, normalAndAdminOnly, getAllTickets);
router.get("/user/:id", protect, getAllTicketsUser);
router.put("/take/:id", protect, adminOnly, takeTicket);
router.put("/close/:id", protect, adminOnly, closeTicket);

module.exports = router;
