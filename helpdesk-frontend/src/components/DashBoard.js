import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTicket, getAllTicketsPerUser } from "../features/tickets/ticketSlice";
import { fetchUsers } from "../features/user/fetchUsersSlice";
import Tooltip from "./Layout/Tooltip";
import preloading from "../assets/images/preloader.gif";
import { filterDepartment } from "../features/departments/departmentSlice";
import DataList from "./DataList";
import Countdown from "./Countdown";

const DashBoard = () => {
	const { user } = useSelector((state) => state.user);
	const { ticketsNotClosedByUser, error, success } = useSelector((state) => state.tickets);
	const { getUsers } = useSelector((state) => state.getUsers);
	const { departments, filter } = useSelector((state) => state.departments);

	const [selectedItemDatalist, setSelectedItemDatalist] = useState("");
	const [formData, setFormData] = useState({
		name: user.fullName,
		nameAllocate: selectedItemDatalist ? selectedItemDatalist?.username : "",
		department: "",
		description: "",
	});
	const { name, department, nameAllocate, description } = formData;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleDatalist = (item) => {
		setSelectedItemDatalist(item);
	};

	const handleCountDown = () => {
		if (user?.username) {
			dispatch(getAllTicketsPerUser(user.username));
		}
	};

	const recordPerPage = 5;
	const [visibleNewCount, setVisibleNewCount] = useState(recordPerPage);

	useEffect(() => {
		// Fetch tickets on initial load
		if (user?.username) {
			dispatch(getAllTicketsPerUser(user?.username));
		}
	}, [user?.username, dispatch]);

	// Fetch the users when component mounts
	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	useEffect(() => {
		// Filter department based on user's departmentID or selected item's departmentID
		const departmentID = selectedItemDatalist?.departmentID || user?.departmentID;
		if (departmentID) {
			dispatch(filterDepartment(departmentID));
		}
	}, [selectedItemDatalist, user?.departmentID, dispatch]);

	useEffect(() => {
		// Update formData whenever selectedItemDatalist or filter changes
		setFormData((prevFormData) => ({
			...prevFormData,
			nameAllocate: selectedItemDatalist?.username || "",
			department: filter?.department || "",
		}));
	}, [selectedItemDatalist, filter]);

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		setFormData({ name: user?.fullName, nameAllocate: selectedItemDatalist?.username, department: user?.departmentID, description: "" });
		dispatch(createTicket(formData));
	};

	const disabledName = () => {
		return `${user.username} - ${user.fullName}`;
	};

	const showMoreNewTickets = () => {
		setVisibleNewCount((prevCount) => prevCount + recordPerPage); // Show 10 more records
	};

	// const getTicketsNotClosed = () => {
	// 	return ticketsNotClosedByUser;
	// };

	if (!user) {
		navigate("/");
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
							<strong>Ticketele mele ({getTicketsNotClosed().length})</strong>
							<span> - Reincarcare in {<Countdown onCountdownComplete={handleCountDown} />}s</span>
						</div>
					</div>

					{ticketsNotClosedByUser.slice(0, visibleNewCount).map((ticket) => (
						<div className="row py-2 border-bottom align-items-center row-moloz d-flex justify-content-between" key={ticket.id}>
							<div className="col-1 fw-bold fs-7 text-secondary">#{ticket.id}</div>

							<Tooltip type="dashboard" data={ticket.description} />
							<div className="col-3 color-blue text-end">
								{ticket.admin && getUsers ? (
									getUsers.find((usr) => usr.username === ticket.admin)?.fullName
								) : (
									<img src={preloading} className="w-25 opacity-25" alt="In asteptare..." />
								)}
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
