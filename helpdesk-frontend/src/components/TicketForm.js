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
			<div id="tickets" className="m-3 p-4 bg-white rounded border border-1 shadow-lg flex-grow-1 max-width-fit">
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

								<Tooltip type="dashboard" data={ticket.description} />
							</div>
						))}

					<div className="h-100 d-flex justify-content-center align-items-end mt-3">
						<button type="button" className="btn btn-warning">
							Vezi Toate Ticketele mele ({ticketCount()})
						</button>
					</div>
				</div>
			</div>

			{/* {showHandleCloseTicket && showCloseTicketId && (
					<div id="createTicket" className="m-3 p-4 bg-white rounded border border-1 shadow-lg flex-grow-1 min-width-fit w-100">
						<div className="d-flex text-warning-emphasis mb-3 justify-content-between">
							<strong>Inchidere Ticket Nr. {showCloseTicketId}</strong>
							<span onClick={() => setShowHandleCloseTicket(false)}>
								<i className="fa-regular fa-2xl fa-rectangle-xmark"></i>
							</span>
						</div>
						<div className="container">
							<label htmlFor="department" className="form-label d-flex justify-content-betwee">
								<span className="text-danger">
									<i className="fa-solid fa-triangle-exclamation"></i>
								</span>
								<span className="mx-2">Descriere Problema</span>
								<span className="text-danger">
									<i className="fa-solid fa-triangle-exclamation fa-xs"></i>
								</span>
							</label>

							<div className="mb-3 p-2 bg-danger-subtle w-100">{getTicketData(showCloseTicketId).description}</div>

							<div className="mb-3">
								<label htmlFor="department" className="form-label">
									Departament
								</label>
								<input
									type="text"
									className="form-control"
									id="department"
									name="department"
									onChange={onChange}
									value={getTicketData(showCloseTicketId).department}
									disabled
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="requester" className="form-label">
									Solicitant
								</label>
								<input type="text" className="form-control" id="requester" name="requester" value={getTicketData(showCloseTicketId).name} disabled />
							</div>
							<div className="mb-3">
								<label htmlFor="description" className="form-label">
									Descriere Rezolvare Problema
								</label>
								<textarea className="form-control" id="description" name="description" rows="3"></textarea>
							</div>
							<div className="mb-3">
								<label htmlFor="description" className="form-label">
									Timp de rezolvare
								</label>
								<div className="d-flex flex-row justify-content-between align-items-center">
									<input type="number" className="form-control" id="solvetime" name="solvetime" value="10" />
									<span className="ms-1">minute</span>
								</div>
							</div>
							<div className="mb-3">
								<button type="button" className="btn btn-info w-100">
									Inchidere Ticket
								</button>
							</div>
						</div>
					</div>
				)} */}
		</section>
	);
};

export default TicketForm;
