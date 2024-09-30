import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTicket } from "../features/tickets/ticketSlice";

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
			<div id="createTicket" className="m-3 p-4 bg-white rounded border border-1 shadow-lg flex-grow-1 min-width-fit">
				<div className="text-warning-emphasis mb-3">
					<strong>Creare Ticket</strong>
				</div>
				<div className="container">
					<div className="mb-3">
						<input type="text" className="form-control" id="ticketCreator" name="ticketCreator" value={disabledName()} disabled />
					</div>
					<div className="mb-3">
						<select className="form-select" name="department" value={department} onChange={onChange} aria-label="department">
							<option selected>Selecteaza Departament</option>
							<option value="1">Achizitii</option>
							<option value="2">Juridic</option>
							<option value="3">Financiar</option>
						</select>
					</div>
					<div className="mb-3">
						<label for="description" className="form-label">
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

			<div id="tickets" className="m-3 p-4 bg-white rounded border border-1 shadow-lg flex-grow-1">
				<div className="container">
					<div className="row mb-3">
						<div className="col-12 col-md-4 text-warning-emphasis">
							<strong>Ticketele mele</strong>
						</div>
					</div>
					<div className="row py-2 border-bottom align-items-center row-moloz">
						<div className="col-1">#342</div>
						<div className="col-3 color-blue">Andrei Varcus</div>
						<div className="col-2">Achizitii</div>
						<div
							data-bs-toggle="tooltip"
							data-bs-placement="top"
							data-bs-custom-className="custom-tooltip"
							data-bs-title="Problema Imprimanta ..nu se porneste nimic!"
							className="col-6 text-truncate text-warning2"
						>
							Problema Imprimanta ..nu se porneste nimic!
						</div>
					</div>

					<div className="h-100 d-flex justify-content-center align-items-end mt-3">
						<button type="button" className="btn btn-warning">
							Vezi Toate Ticketele mele (12)
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TicketForm;
