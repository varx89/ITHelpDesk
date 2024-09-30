import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TicketForm from "./TicketForm";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/user/userSlice";

const DashBoard = () => {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logout = () => {
		dispatch(logoutUser());
		navigate("/");
	};

	return (
		<div>
			<h1>Welcome {user?.username}</h1>
			<span style={{ cursor: "pointer", backgroundColor: "red", fontWeight: "bold", padding: "5px", borderRadius: "5px", color: "white" }} onClick={logout}>
				Logout
			</span>
			<TicketForm data={user} />
		</div>
	);
};

export default DashBoard;
