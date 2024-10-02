import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets, takeTicket, closeTicket } from "../features/tickets/ticketSlice";
import { Navigate } from "react-router-dom";
import Charts from "./Layout/Charts";
import Tooltip from "./Layout/Tooltip";

const AdminPanel = () => {
	const [formData, setFormData] = useState({ name: "", department: "", description: "" });
	const { name, department, description } = formData;

	const { tickets } = useSelector((state) => state.tickets);
	const { user } = useSelector((state) => state.user);

	const [showOpenTickets, setShowOpenTickets] = useState(true);
	const [showClosedTickets, setShowClosedTickets] = useState(false);
	const [showTotalTickets, setShowTotalTickets] = useState(false);

	const toggleOpenTickets = () => {
		setShowOpenTickets(!showOpenTickets);
		setShowClosedTickets(false);
		setShowTotalTickets(false);
	};

	const toggleClosedTickets = () => {
		setShowClosedTickets(!showClosedTickets);
		setShowOpenTickets(false);
		setShowTotalTickets(false);
	};

	const toggleTotalTickets = () => {
		setShowTotalTickets(!showTotalTickets);
		setShowOpenTickets(false);
		setShowClosedTickets(false);
	};

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllTickets());
	}, [dispatch]);

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleTakeOver = (id) => {
		dispatch(takeTicket(id));
	};

	const handleCloseTicket = (id, solvingRemark) => {
		dispatch(closeTicket({ id, solvingRemark }));
	};

	const ticketCountNew = () => {
		return tickets.filter((ticket) => ticket.status === "new").length;
	};
	const ticketCountinProgress = () => {
		return tickets.filter((ticket) => ticket.status === "in_progress" && ticket.admin === user.username).length;
	};
	const ticketCountClosed = () => {
		return tickets.filter((ticket) => ticket.status === "closed" && ticket.admin === user.username).length;
	};
	const ticketCountTotal = () => {
		return tickets.filter((ticket) => ticket.status === "closed").length;
	};

	if (user?.role !== "admin") {
		return <Navigate to="/dashboard" />;
	}

	return (
		<>
			<section id="ticketsArea" className="container d-flex flex-wrap justify-content-center">
				<div id="createTicket" className="m-3 p-4 bg-white rounded border border-1 shadow-lg flex-grow-1 min-width-fit w-100">
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

				<div id="tickets" className="m-3 p-4 bg-white rounded border border-1 shadow-lg flex-grow-1 min-width-fit">
					<div className="container">
						<div className="row mb-3">
							<div className="col-12 col-md-8 text-warning-emphasis">
								<button
									type="button"
									className={`btn border ${showOpenTickets ? "bg-dark-subtle" : "btn-light"} text-warning-emphasis`}
									onClick={toggleOpenTickets}
								>
									<strong>Ticketele mele deschise</strong>
								</button>
								<button
									type="button"
									className={`btn ${showClosedTickets ? "bg-dark-subtle" : "btn-light"} border text-warning-emphasis`}
									onClick={toggleClosedTickets}
								>
									<strong>Ticketele mele inchise</strong>
								</button>
								<button
									type="button"
									className={`btn ${showTotalTickets ? "bg-dark-subtle" : "btn-light"} border text-warning-emphasis`}
									onClick={toggleTotalTickets}
								>
									<strong>Total tickete inchise global</strong>
								</button>
							</div>
						</div>

						{/* Ticketele mele deschise START */}
						{showOpenTickets &&
							tickets
								.filter((ticket) => ticket.status === "in_progress" && ticket.admin === user.username)
								.map((ticket) => (
									<div className="row py-2 border-bottom align-items-center" key={ticket.id}>
										<div className="col-1">#{ticket.id}</div>
										<div className="col-1">
											<img
												src={`https://ui-avatars.com/api/?name=${ticket?.name}&background=0D8ABC&color=fff`}
												className="rounded-circle resize-img-nav-profile"
												alt="Profil"
											/>
										</div>
										<div className="col-2 color-blue">{ticket.name}</div>
										<div className="col-2">{ticket.department}</div>
										<Tooltip type="admin" data={ticket.description} />
										<div className="col-2 d-flex justify-content-end">
											<button type="button" className="btn bg-danger text-white">
												Inchide Ticket
											</button>
										</div>
									</div>
								))}

						{showOpenTickets && (
							<div className="h-100 d-flex justify-content-center align-items-end mt-3">
								<button type="button" className="btn btn-warning">
									Vezi Toate Ticketele mele ({ticketCountinProgress()})
								</button>
							</div>
						)}

						{/* Ticketele mele inchise START */}
						{showClosedTickets &&
							tickets
								.filter((ticket) => ticket.status === "closed" && ticket.admin === user.username)
								.map((ticket) => (
									<div className="row py-2 border-bottom align-items-center" key={ticket.id}>
										<div className="col-1">#{ticket.id}</div>
										<div className="col-1">
											<img
												src={`https://ui-avatars.com/api/?name=${ticket?.name}&background=0D8ABC&color=fff`}
												className="rounded-circle resize-img-nav-profile"
												alt="Profil"
											/>
										</div>
										<div className="col-2 color-blue">{ticket.name}</div>
										<div className="col-2">{ticket.department}</div>
										<Tooltip type="admin" data={ticket.description} />
									</div>
								))}

						{showClosedTickets && (
							<div className="h-100 d-flex justify-content-center align-items-end mt-3">
								<button type="button" className="btn btn-warning">
									Vezi Toate Ticketele mele ({ticketCountClosed()})
								</button>
							</div>
						)}

						{/* Ticketele total inchise START */}
						{showTotalTickets &&
							tickets
								.filter((ticket) => ticket.status === "closed")
								.map((ticket) => (
									<div className="row py-2 border-bottom align-items-center" key={ticket.id}>
										<div className="col-1">#{ticket.id}</div>
										<div className="col-1">
											<img
												src={`https://ui-avatars.com/api/?name=${ticket?.name}&background=0D8ABC&color=fff`}
												className="rounded-circle resize-img-nav-profile"
												alt="Profil"
											/>
										</div>
										<div className="col-2 color-blue">{ticket.name}</div>
										<div className="col-2">{ticket.department}</div>
										<Tooltip type="admin" data={ticket.description} />
									</div>
								))}

						{showTotalTickets && (
							<div className="h-100 d-flex justify-content-center align-items-end mt-3">
								<button type="button" className="btn btn-warning">
									Vezi Toate Ticketele mele ({ticketCountTotal()})
								</button>
							</div>
						)}
					</div>
				</div>

				<div id="ticketsNew" className="m-3 p-4 bg-lightblue rounded border border-1 shadow-lg flex-grow-1 min-width-fit">
					<div className="container">
						<div className="row mb-3">
							<div className="col-12 col-md-3 text-warning-emphasis">
								<strong>Tickete Noi</strong>
							</div>
						</div>
						{tickets
							.filter((ticket) => ticket.status === "new")
							.map((ticket) => (
								<div className="row py-2 align-items-center border-bottom row-moloz-white" key={ticket.id}>
									<div className="col-1">#{ticket.id}</div>
									<div className="col-1">
										<img
											src={`https://ui-avatars.com/api/?name=${ticket?.name}&background=0D8ABC&color=fff`}
											className="rounded-circle resize-img-nav-profile"
											alt="Profil"
										/>
									</div>
									<div className="col-2 color-blue">{ticket.name}</div>
									<div className="col-2">Achizitii</div>
									<Tooltip type="admin" data={ticket.description} />
									<div className="col-2 d-flex justify-content-end">
										<button type="button" className="btn bg-success text-white" onClick={() => handleTakeOver(ticket.id)}>
											Preia Ticket
										</button>
									</div>
								</div>
							))}

						<div className="h-100 d-flex justify-content-center align-items-end mt-3">
							<button type="button" className="btn btn-warning">
								Vezi Toate Ticketele ({ticketCountNew()})
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
