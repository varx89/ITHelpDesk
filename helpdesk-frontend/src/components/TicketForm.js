import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTicket } from "../features/tickets/ticketSlice";
import Tooltip from "./Layout/Tooltip";
import departments from "../utils/js-departments";

const TicketForm = (props) => {
	const [formData, setFormData] = useState({ name: props.data.fullName, department: "", description: "" });
	const { name, department, description } = formData;

	const dispatch = useDispatch();

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(createTicket(formData));
	};

	const disabledName = () => {
		return `${props.data.username} - ${props.data.fullName}`;
	};

	const ticketCount = () => {
		return props.ticketData.filter((ticket) => ticket.username === props.data.username).length;
	};

	return (
		// <div>
		// 	<h1>Create a Ticket</h1>
		// 	<form onSubmit={onSubmit}>
		// 		<input type="text" name="fullName" value={disabledName()} onChange={onChange} disabled required />
		// 		<input type="text" name="department" value={department} onChange={onChange} placeholder="Department" required />
		// 		<textarea name="description" value={description} onChange={onChange} placeholder="Problem Description" required />
		// 		<button type="submit">Create Ticket</button>
		// 	</form>
		// </div>

		<section id="ticketsArea" className="container d-flex flex-wrap justify-content-center">
			<form onSubmit={onSubmit} name="submitForm" id="submitForm">
				<div id="createTicket" className="m-3 p-4 bg-white rounded border border-1 shadow-lg flex-grow-1 min-width-fit">
					<div className="text-warning-emphasis mb-3">
						<strong>Creare Ticket</strong>
					</div>
					<div className="container">
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
			<div id="tickets" className="m-3 p-4 bg-white rounded border border-1 shadow-lg flex-grow-1">
				<div className="container">
					<div className="row mb-3">
						<div className="col-12 col-md-4 text-warning-emphasis">
							<strong>Ticketele mele</strong>
						</div>
					</div>

					{props.ticketData
						.filter((ticket) => ticket.status && ticket.username === props.data.username)
						.map((ticket) => (
							<div className="row py-2 border-bottom align-items-center row-moloz" key={ticket.id}>
								<div className="col-1">#{ticket.id}</div>
								<div className="col-3 color-blue">{ticket.name}</div>
								<div className="col-2">{ticket.department}</div>

								<Tooltip data={ticket.description} />
							</div>
						))}

					<div className="h-100 d-flex justify-content-center align-items-end mt-3">
						<button type="button" className="btn btn-warning">
							Vezi Toate Ticketele mele ({ticketCount()})
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TicketForm;