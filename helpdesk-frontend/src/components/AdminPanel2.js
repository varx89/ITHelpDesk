import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets, takeTicket, closeTicket } from "../features/tickets/ticketSlice";
import { Navigate } from "react-router-dom";

const AdminPanel = () => {
	const dispatch = useDispatch();
	const { tickets } = useSelector((state) => state.tickets);
	const { user } = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(getAllTickets());
	}, [dispatch]);

	const handleTakeOver = (id) => {
		dispatch(takeTicket(id));
	};

	const handleCloseTicket = (id, solvingRemark) => {
		dispatch(closeTicket({ id, solvingRemark }));
	};

	if (user?.role !== "admin") {
		return <Navigate to="/dashboard" />;
	}

	return (
		<div>
			<h1>Admin Panel {user.role}</h1>
			<h2>New Tickets</h2>
			{tickets
				.filter((ticket) => ticket.status === "new")
				.map((ticket) => (
					<div key={ticket.id}>
						<h3>{ticket.name}</h3>
						<p>{ticket.description}</p>
						<button onClick={() => handleTakeOver(ticket.id)}>Take Over</button>
					</div>
				))}

			<h2>My Open Tickets</h2>
			{tickets
				.filter((ticket) => ticket.status === "in_progress" && ticket.admin === user.username)
				.map((ticket) => (
					<div key={ticket.id}>
						<h3>{ticket.name}</h3>
						<p>{ticket.solvingRemark}</p>
					</div>
				))}

			<h2>My Closed Tickets</h2>
			{tickets
				.filter((ticket) => ticket.status === "closed" && ticket.admin === user.username)
				.map((ticket) => (
					<div key={ticket.id}>
						<h3>{ticket.name}</h3>
						<p>{ticket.solvingRemark}</p>
					</div>
				))}

			<h2>All Closed Tickets</h2>
			{tickets
				.filter((ticket) => ticket.status === "closed")
				.map((ticket) => (
					<div key={ticket.id}>
						<h3>{ticket.name}</h3>
						<p>{ticket.solvingRemark}</p>
					</div>
				))}
		</div>
	);
};

export default AdminPanel;
