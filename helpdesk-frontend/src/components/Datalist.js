import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../features/user/fetchUsersSlice";

const Datalist = ({ onSelectItem }) => {
	const dispatch = useDispatch();
	const { getUser, status, error } = useSelector((state) => state.getUser);
	const [query, setQuery] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);
	const [selectedItem, setSelectedItem] = useState(0);

	const handleInputChange = (e) => {
		const value = e.target.value;
		setQuery(value);

		if (value) {
			dispatch(fetchUser(value)); // Fetch users from API
		}
	};

	const handleUserSelect = (userName, userObj) => {
		setQuery(userName); // Set the selected user name in the input

		if (userObj) {
			setSelectedItem(userObj);
			onSelectItem(userObj);
		} else {
			setSelectedItem(0);
			onSelectItem(0);
		}
	};

	return (
		<div className="dropdown">
			<button
				className="btn btn-secondary dropdown-toggle text-secondary-emphasis border bg-body w-100 d-flex justify-content-between align-items-center"
				type="button"
				id="dropdownMenuButton"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				{selectedItem?.fullName || "Creare ticket pt alt utilizator"}
			</button>
			<ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
				<input className="form-control" type="text" placeholder="Cauta..." onChange={handleInputChange} value={query} />
				<li key="0">
					<a href="#" className="dropdown-item" onClick={() => handleUserSelect(0, 0)}>
						- Fara utilizator -
					</a>
				</li>
				{Array.isArray(getUser) &&
					getUser.length > 0 &&
					getUser.map((item) => (
						<li key={item.id}>
							<a href="#" className="dropdown-item" onClick={() => handleUserSelect(item?.fullName, item)}>
								{item.fullName}
							</a>
						</li>
					))}
			</ul>
		</div>
	);
};

export default Datalist;

// const Datalist = ({ onSelectItem }) => {
// 	const dispatch = useDispatch();
// 	const { getUser, status, error } = useSelector((state) => state.getUser);
// 	const [query, setQuery] = useState("");
// 	const [showDropdown, setShowDropdown] = useState(false);

// 	const handleInputChange = (e) => {
// 		const value = e.target.value;
// 		setQuery(value);

// 		if (value) {
// 			dispatch(fetchUser(value)); // Fetch users from API
// 			setShowDropdown(true);
// 		} else {
// 			setShowDropdown(false);
// 		}
// 	};

// 	const handleUserSelect = (userName, userObj) => {
// 		setQuery(userName); // Set the selected user name in the input
// 		setShowDropdown(false); // Close the dropdown
// 		onSelectItem(userObj);
// 	};

// 	return (
// 		<div className="position-relative">
// 			<label htmlFor="userSearch" className="form-label">
// 				Redirectionare Ticket catre alt Utilizator:
// 			</label>
// 			<input
// 				type="text"
// 				id="userSearch"
// 				className="form-control"
// 				value={query}
// 				onChange={handleInputChange}
// 				placeholder="Cauta utilizator..."
// 				autoComplete="off"
// 			/>

// 			{showDropdown && (
// 				<ul className="dropdown-menu show w-100">
// 					{status === "loading" && <li className="dropdown-item">Loading...</li>}
// 					{status === "failed" && <li className="dropdown-item text-danger">Error: {error}</li>}
// 					{Array.isArray(getUser) &&
// 						getUser?.map((item) => (
// 							<li key={item.id} className="dropdown-item" onClick={() => handleUserSelect(item.fullName, item)}>
// 								{item.fullName}
// 							</li>
// 						))}
// 					{status === "succeeded" && getUser.length === 0 && <li className="dropdown-item text-muted">No users found</li>}
// 				</ul>
// 			)}
// 		</div>
// 	);
// };

// export default Datalist;
