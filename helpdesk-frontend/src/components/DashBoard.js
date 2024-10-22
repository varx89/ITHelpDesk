import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTickets, createTicket } from "../features/tickets/ticketSlice";
import Tooltip from "./Layout/Tooltip";
import preloading from "../assets/images/preloader.gif";
import { filterDepartment } from "../features/departments/departmentSlice";
import DataList from "./DataList";
import Countdown from "./Countdown";

const DashBoard = () => {
	const { user } = useSelector((state) => state.user);
	const { tickets, error, success } = useSelector((state) => state.tickets);
	const { departments, filter } = useSelector((state) => state.departments);

	const [selectedItemDatalist, setSelectedItemDatalist] = useState("");
	const [countdownTimer, setCountdownTimer] = useState(null);
	const [formData, setFormData] = useState({ name: user.fullName, nameAllocate: "", department: "", description: "" });
	const { name, department, nameAllocate, description } = formData;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleDatalist = (item) => {
		setSelectedItemDatalist(item);
	};

	const handleCountDown = (time) => {
		setCountdownTimer(time);
	};

	const recordPerPage = 5;
	const [visibleNewCount, setVisibleNewCount] = useState(recordPerPage);

	useEffect(() => {
		dispatch(getAllTickets());
	}, []);

	useEffect(() => {
		if (user?.departmentID) {
			dispatch(filterDepartment(user?.departmentID));
		}
	}, [dispatch, user?.departmentID]);

	useEffect(() => {
		if (selectedItemDatalist !== 0) {
			dispatch(filterDepartment(selectedItemDatalist?.departmentID));
		} else if (selectedItemDatalist === 0) {
			dispatch(filterDepartment(user?.departmentID));
		}
	}, [selectedItemDatalist]);

	useEffect(() => {
		if (countdownTimer) {
			dispatch(getAllTickets());
		}
	}, [countdownTimer]);

	useEffect(() => {
		setFormData((prevFormData) => ({
			...prevFormData,
			nameAllocate: selectedItemDatalist.username,
			department: filter?.department,
		}));
	}, [selectedItemDatalist, filter]);

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		setFormData({ name: user.fullName, nameAllocate: selectedItemDatalist, department: "", description: "" });
		dispatch(createTicket(formData));
	};

	const disabledName = () => {
		return `${user.username} - ${user.fullName}`;
	};

	const ticketCount = () => {
		return tickets.filter((ticket) => ticket.username === user.username && ticket.status !== "closed").length;
	};

	const showMoreNewTickets = () => {
		setVisibleNewCount((prevCount) => prevCount + recordPerPage); // Show 10 more records
	};

	if (!user) {
		navigate("/login");
	}

	if (selectedItemDatalist) {
		console.log(selectedItemDatalist);
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
						{user && user.role === "admin" && (
							<div className="mb-3">
								<DataList onSelectItem={handleDatalist} />
							</div>
						)}

						<div className="mb-3 text-center">
							<input type="text" className="form-control" id="department" name="department" value={filter?.departmentFullName || ""} disabled />
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
						<div className="col-12 col-md-4 text-warning-emphasis w-100">
							<strong>Ticketele mele ({ticketCount()})</strong>
							<span> - Reincarcare in {<Countdown onCountdownComplete={handleCountDown} />}s</span>
						</div>
					</div>

					{tickets
						.filter((ticket) => ticket.status !== "closed" && ticket.username === user.username)
						.toReversed()
						.slice(0, visibleNewCount)
						.map((ticket) => (
							<div className="row py-2 border-bottom align-items-center row-moloz d-flex justify-content-between" key={ticket.id}>
								<div className="col-1 fw-bold fs-7 text-secondary">#{ticket.id}</div>

								{/* <div className="col-2">{ticket.name}</div> */}

								<Tooltip type="dashboard" data={ticket.description} />
								<div className="col-3 color-blue text-end">
									{ticket?.adminFullName ? ticket?.adminFullName : <img src={preloading} className="w-25 opacity-25" alt="In asteptare..." />}
								</div>
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
