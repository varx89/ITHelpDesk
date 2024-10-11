import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTickets } from "../features/tickets/ticketSlice";
import Tooltip from "./Layout/Tooltip";
import departments from "../utils/js-departments";
import { createTicket } from "../features/tickets/ticketSlice";

const DashBoard = () => {
	const { user } = useSelector((state) => state.user);
	const { tickets, error, success } = useSelector((state) => state.tickets);

	const [formData, setFormData] = useState({ name: user.fullName, department: "", description: "" });
	const { name, department, description } = formData;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const recordPerPage = 5;
	const [visibleNewCount, setVisibleNewCount] = useState(recordPerPage);

	useEffect(() => {
		dispatch(getAllTickets());
	}, [dispatch, tickets, user]);

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(createTicket(formData));
		setFormData({ name: user.fullName, department: "", description: "" });
	};

	const disabledName = () => {
		return `${user.username} - ${user.fullName}`;
	};

	const ticketCount = () => {
		return tickets.filter((ticket) => ticket.username === user.username).length;
	};

	const showMoreNewTickets = () => {
		setVisibleNewCount((prevCount) => prevCount + recordPerPage); // Show 10 more records
	};

	if (!user) {
		navigate("/login");
	}

	return (
		<section id="ticketsArea" className="container d-flex flex-wrap justify-content-center">
			<form onSubmit={onSubmit} name="submitForm" id="submitForm">
				<div id="createTicket" className="m-3 p-4 bg-white rounded border border-1 shadow-lg flex-grow-1 min-width-fit">
					<div className="text-warning-emphasis mb-3">
						<strong>Creare Ticket</strong>
					</div>
					<div className="container">
						{error && (
							<strong>
								<div className="alert alert-danger">{error}</div>
							</strong>
						)}
						{success && (
							<strong>
								<div className="alert alert-success">{success}</div>
							</strong>
						)}
						<div className="mb-3">
							<input type="text" className="form-control" id="ticketCreator" name="ticketCreator" value={disabledName()} disabled />
						</div>
						<div className="mb-3">
							<select className="form-select" name="department" value={department} onChange={onChange} id="department" aria-label="department">
								<option value="defaultx">Selecteaza Departament</option>
								{departments.map((department) => (
									<option key={department.value} value={department.value}>
										{department.label}
									</option>
								))}
							</select>
						</div>
						<div className="mb-3">
							<label htmlFor="description" className="form-label">
								Descriere Problema
							</label>
							<textarea className="form-control" id="description" name="description" value={description} onChange={onChange} rows="3"></textarea>
						</div>
						<div className="mb-3">
							<button type="submit" className="btn btn-info w-100">
								Creare Ticket
							</button>
						</div>
					</div>
				</div>
			</form>
			<div id="tickets" className="m-3 p-4 bg-white rounded border border-1 shadow-lg flex-grow-1 max-width-fit">
				<div className="container">
					<div className="row mb-3">
						<div className="col-12 col-md-4 text-warning-emphasis">
							<strong>Ticketele mele ({ticketCount()})</strong>
						</div>
					</div>

					{tickets
						.filter((ticket) => ticket.status && ticket.username === user.username)
						.toReversed()
						.slice(0, visibleNewCount)
						.map((ticket) => (
							<div className="row py-2 border-bottom align-items-center row-moloz" key={ticket.id}>
								<div className="col-1">#{ticket.id}</div>

								<div className="col-2">{ticket.department}</div>

								<Tooltip type="dashboard" data={ticket.description} />
								<div className="col-3 color-blue">{ticket.adminFullName}</div>
							</div>
						))}

					<div className="h-100 d-flex justify-content-center align-items-end mt-3">
						<button type="button" className="btn btn-warning" onClick={showMoreNewTickets}>
							+ Vezi mai multe tickete +
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DashBoard;
