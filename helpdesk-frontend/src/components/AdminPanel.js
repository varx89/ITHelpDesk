import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets, takeTicket, closeTicket } from "../features/tickets/ticketSlice";
import { Navigate } from "react-router-dom";
import Charts from "./Layout/Charts";

const AdminPanel = () => {
	const dispatch = useDispatch();
	const { tickets } = useSelector((state) => state.tickets);
	const { user } = useSelector((state) => state.user);
	const [remark, setRemark] = useState("");
	const [selectedTicketId, setSelectedTicketId] = useState(null);

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
		<>
			<section id="ticketsArea" className="container d-flex flex-wrap justify-content-center">
				<div id="createTicket" className="m-3 p-4 bg-white rounded border border-1 shadow-lg flex-grow-1 min-width-fit">
					<div className="text-warning-emphasis mb-3">
						<strong>Inchidere Ticket</strong>
					</div>
					<div className="container">
						<div className="mb-3 p-2 bg-danger-subtle">Problema Imprimanta ..nu se porneste nimic!</div>
						<div className="mb-3">
							<label htmlFor="department" className="form-label">
								Departament
							</label>
							<input type="text" className="form-control" id="department" name="department" value="Achizitii" disabled />
						</div>
						<div className="mb-3">
							<label htmlFor="requester" className="form-label">
								Solicitant
							</label>
							<input type="text" className="form-control" id="requester" name="requester" value="Luciana Petran" disabled />
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

				<div id="ticketsNew" className="m-3 p-4 bg-lightblue rounded border border-1 shadow-lg flex-grow-1">
					<div className="container">
						<div className="row mb-3">
							<div className="col-12 col-md-3 text-warning-emphasis">
								<strong>Tickete Noi</strong>
							</div>
						</div>
						<div className="row py-2 align-items-center border-bottom row-moloz-white">
							<div className="col-1">#342</div>
							<div className="col-1">
								<img
									src="https://ui-avatars.com/api/?name=Andrei+Varcus&background=0D8ABC&color=fff"
									className="rounded-circle resize-img-nav-profile"
									alt="Profil"
								/>
							</div>
							<div className="col-2 color-blue">Andrei Varcus</div>
							<div className="col-2">Achizitii</div>
							<div
								data-bs-toggle="tooltip"
								data-bs-placement="top"
								data-bs-custom-class="custom-tooltip"
								data-bs-title="Problema Imprimanta ..nu se porneste nimic!"
								className="col-4 text-truncate text-warning2"
							>
								Problema Imprimanta ..nu se porneste nimic!
							</div>
							<div className="col-2 d-flex justify-content-end">
								<button type="button" className="btn bg-success text-white">
									Preia Ticket
								</button>
							</div>
						</div>

						<div className="h-100 d-flex justify-content-center align-items-end mt-3">
							<button type="button" className="btn btn-warning">
								Vezi Toate Ticketele (24)
							</button>
						</div>
					</div>
				</div>

				<div id="tickets" className="m-3 p-4 bg-white rounded border border-1 shadow-lg flex-grow-1">
					<div className="container">
						<div className="row mb-3">
							<div className="col-12 col-md-8 text-warning-emphasis">
								<button type="button" className="btn btn-light border bg-dark-subtle text-warning-emphasis">
									<strong>Ticketele mele deschise</strong>
								</button>
								<button type="button" className="btn btn-light border text-warning-emphasis">
									<strong>Ticketele mele inchise</strong>
								</button>
								<button type="button" className="btn btn-light border text-warning-emphasis">
									<strong>Total tickete inchise global</strong>
								</button>
							</div>
						</div>
						<div className="row py-2 border-bottom align-items-center">
							<div className="col-1">#342</div>
							<div className="col-1">
								<img src="https://ui-avatars.com/api/?name=Luciana+Petran" className="rounded-circle resize-img-nav-profile" alt="Profil" />
							</div>
							<div className="col-2 color-blue">Andrei Varcus</div>
							<div className="col-2">Achizitii</div>
							<div
								data-bs-toggle="tooltip"
								data-bs-placement="top"
								data-bs-custom-class="custom-tooltip"
								data-bs-title="Problema Imprimanta ..nu se porneste nimic!"
								className="col-4 text-truncate text-warning2"
							>
								Problema Imprimanta ..nu se porneste nimic!
							</div>
							<div className="col-2 d-flex justify-content-end">
								<button type="button" className="btn bg-danger text-white">
									Inchide Ticket
								</button>
							</div>
						</div>

						<div className="h-100 d-flex justify-content-center align-items-end mt-3">
							<button type="button" className="btn btn-warning">
								Vezi Toate Ticketele mele (12)
							</button>
						</div>
					</div>
				</div>

				<div id="graphics" className="m-3 p-4 bg-white rounded border border-1 shadow-lg flex-grow-1">
					<div className="container">
						<div className="col mb-3">
							<Charts />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default AdminPanel;
