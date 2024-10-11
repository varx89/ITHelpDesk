import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets, takeTicket, closeTicket } from "../features/tickets/ticketSlice";
import { Navigate } from "react-router-dom";
import Charts from "./Layout/Charts";
import Tooltip from "./Layout/Tooltip";

const AdminPanel = () => {
	const { tickets, error, success } = useSelector((state) => state.tickets);
	const { user } = useSelector((state) => state.user);
	const [remark, setRemark] = useState("");
	const [duration, setDuration] = useState("");

	const recordPerPage = 5;
	const [visibleNewCount, setVisibleNewCount] = useState(recordPerPage);
	const [visibleMyOpenCount, setMyVisibleMyOpenCount] = useState(recordPerPage);
	const [visibleMyCloseCount, setMyVisibleMyCloseCount] = useState(recordPerPage);
	const [visibleTotalCloseCount, setMyVisibleTotalCloseCount] = useState(recordPerPage);

	const dispatch = useDispatch();

	const [showOpenTickets, setShowOpenTickets] = useState(true);
	const [showClosedTickets, setShowClosedTickets] = useState(false);
	const [showTotalTickets, setShowTotalTickets] = useState(false);
	const [showHandleCloseTicket, setShowHandleCloseTicket] = useState(false);
	const [showCloseTicketId, setShowCloseTicketId] = useState("");

	useEffect(() => {
		dispatch(getAllTickets());
	}, [dispatch, showOpenTickets, showClosedTickets, showTotalTickets, tickets]);

	// useEffect(() => {
	// 	// This effect runs when showOpenTickets, showClosedTickets, or showTotalTickets changes
	// 	// You can add logic here if you need to perform any actions when the filters change
	// }, [showOpenTickets, showClosedTickets, showTotalTickets, tickets]);

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

	const handleTakeOver = (id) => {
		dispatch(takeTicket(id));
	};

	const onCloseTicket = (id, solvingRemark, timeSpan) => {
		dispatch(closeTicket({ id, solvingRemark, timeSpan }));
	};

	const handleCloseTicket = (id) => {
		setShowHandleCloseTicket(true);
		setShowCloseTicketId(id);
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
	const getTicketData = (sid) => {
		return tickets.filter((ticket) => ticket.id === sid)[0];
	};

	const showMoreNewTickets = () => {
		setVisibleNewCount((prevCount) => prevCount + recordPerPage); // Show 10 more records
	};
	const showMoreMyOpenTickets = () => {
		setMyVisibleMyOpenCount((prevCount) => prevCount + recordPerPage); // Show 10 more records
	};
	const showMoreMyCloseTickets = () => {
		setMyVisibleMyCloseCount((prevCount) => prevCount + recordPerPage); // Show 10 more records
	};
	const showMoreTotalCloseTickets = () => {
		setMyVisibleTotalCloseCount((prevCount) => prevCount + recordPerPage); // Show 10 more records
	};

	if (user?.role !== "admin") {
		return <Navigate to="/dashboard" />;
	}

	return (
		<>
			<section id="ticketsArea" className="container d-flex flex-wrap justify-content-center">
				{showHandleCloseTicket && showCloseTicketId && (
					<>
						{/* Modal Backdrop */}
						<div className="modal-backdrop show"></div>

						{/* Modal */}
						<div className="modal show d-block" tabIndex="-1" role="dialog">
							<form name="submitForm" id="submitForm">
								<div className="modal-dialog" role="document">
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title">Inchidere Ticket Nr. {showCloseTicketId}</h5>
											<button type="button" className="btn-close" onClick={() => setShowHandleCloseTicket(false)} aria-label="Close"></button>
										</div>
										<div className="modal-body">
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
												<label htmlFor="problemDescription" className="form-label d-flex justify-content-between">
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
													<label htmlFor="resolutionDescription" className="form-label">
														Descriere Rezolvare Problema
													</label>
													<textarea
														className="form-control"
														id="resolutionDescription"
														value={remark}
														name="resolutionDescription"
														rows="3"
														onChange={(e) => setRemark(e.target.value)}
													></textarea>
												</div>
												<div className="mb-3">
													<label htmlFor="solvetime" className="form-label">
														Timp de rezolvare
													</label>
													<div className="d-flex flex-row justify-content-between align-items-center">
														<input
															type="number"
															className="form-control"
															value={duration}
															id="duration"
															name="duration"
															onChange={(e) => setDuration(e.target.value)}
														/>
														<span className="ms-1">minute</span>
													</div>
												</div>
											</div>
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-info w-100" onClick={() => onCloseTicket(showCloseTicketId, remark, duration)}>
												Inchidere Ticket
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</>
				)}

				<div id="tickets" className="m-3 p-4 bg-white rounded border border-1 shadow-lg flex-grow-1 min-width-fit">
					<div className="container">
						<div className="row mb-3">
							<div className="col-12 col-md-8 text-warning-emphasis">
								<button
									type="button"
									className={`btn border ${showOpenTickets ? "bg-dark-subtle" : "btn-light"} text-warning-emphasis mx-1`}
									onClick={toggleOpenTickets}
								>
									<strong>Ticketele mele deschise ({ticketCountinProgress()})</strong>
								</button>
								<button
									type="button"
									className={`btn ${showClosedTickets ? "bg-dark-subtle" : "btn-light"} border text-warning-emphasis mx-1`}
									onClick={toggleClosedTickets}
								>
									<strong>Ticketele mele inchise ({ticketCountClosed()})</strong>
								</button>
								<button
									type="button"
									className={`btn ${showTotalTickets ? "bg-dark-subtle" : "btn-light"} border text-warning-emphasis mx-1`}
									onClick={toggleTotalTickets}
								>
									<strong>Total tickete inchise global ({ticketCountTotal()})</strong>
								</button>
							</div>
						</div>

						{/* Ticketele mele deschise START */}
						{showOpenTickets &&
							tickets
								.filter((ticket) => ticket.status === "in_progress" && ticket.admin === user.username)
								.slice(0, visibleMyOpenCount)
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
											<button type="button" className="btn bg-danger text-white" onClick={() => handleCloseTicket(ticket.id)}>
												Inchide Ticket
											</button>
										</div>
									</div>
								))}

						{showOpenTickets && (
							<div className="h-100 d-flex justify-content-center align-items-end mt-3">
								<button type="button" className="btn btn-warning" onClick={showMoreMyOpenTickets}>
									+ Vezi mai multe din ticketele mele +
								</button>
							</div>
						)}

						{/* Ticketele mele inchise START */}
						{showClosedTickets &&
							tickets
								.filter((ticket) => ticket.status === "closed" && ticket.admin === user.username)
								.toReversed()
								.slice(0, visibleMyCloseCount)
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
								<button type="button" className="btn btn-warning" onClick={showMoreMyCloseTickets}>
									+ Vezi mai multe din ticketele mele inchise +
								</button>
							</div>
						)}

						{/* Ticketele total inchise START */}
						{showTotalTickets &&
							tickets
								.filter((ticket) => ticket.status === "closed")
								.toReversed()
								.slice(0, visibleTotalCloseCount)
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
										{/* <div className="col-2 text-warning-emphasis">{getAdminFullName(ticket.admin)}</div> */}
									</div>
								))}

						{showTotalTickets && (
							<div className="h-100 d-flex justify-content-center align-items-end mt-3">
								<button type="button" className="btn btn-warning" onClick={showMoreTotalCloseTickets}>
									+ Vezi mai multe tickete inchise +
								</button>
							</div>
						)}
					</div>
				</div>
				{/* Ticketele NOI START */}
				<div id="ticketsNew" className="m-3 p-4 bg-lightblue rounded border border-1 shadow-lg flex-grow-1 min-width-fit">
					<div className="container">
						<div className="row mb-3">
							<div className="col-12 col-md-3 text-warning-emphasis">
								<strong>Tickete Noi ({ticketCountNew()})</strong>
							</div>
						</div>
						{tickets
							.filter((ticket) => ticket.status === "new")
							.slice(0, visibleNewCount)
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

						<div className="h-100 d-flex justify-content-center align-items-end mt-3 w-30">
							<button type="button" className="btn btn-warning" onClick={showMoreNewTickets}>
								+ Vezi mai multe tickete noi +
							</button>
						</div>
					</div>
				</div>
				{/* Chart START */}
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
