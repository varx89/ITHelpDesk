// backend/routes/ticketRoutes.js
const express = require("express");
const { protect, normalAndAdminOnly, adminOnly } = require("../middleware/authMiddleware");
const { createTicket, getAllTickets, takeTicket, closeTicket } = require("../controllers/ticketController");
const router = express.Router();

router.post("/create", protect, normalAndAdminOnly, createTicket);
router.get("/", protect, adminOnly, getAllTickets);
router.put("/take/:id", protect, adminOnly, takeTicket);
router.put("/close/:id", protect, adminOnly, closeTicket);

module.exports = router;
