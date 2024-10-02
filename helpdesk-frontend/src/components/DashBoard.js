import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TicketForm from "./TicketForm";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/user/userSlice";
import { getAllTickets } from "../features/tickets/ticketSlice";

const DashBoard = () => {
	const { user } = useSelector((state) => state.user);
	const { tickets } = useSelector((state) => state.tickets);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getAllTickets());
	}, [dispatch]);

	return (
		<div>
			<TicketForm data={user} ticketData={tickets} />
		</div>
	);
};

export default DashBoard;
