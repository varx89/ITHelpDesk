import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../features/user/fetchUsersSlice";

const Datalist = ({ onSelectItem }) => {
	const { user } = useSelector((state) => state.user);
	const { getUsers } = useSelector((state) => state.getUsers);
	const dispatch = useDispatch();

	// Component state for search query and filtered data
	const [dataList, setDataList] = useState([]);
	const [query, setQuery] = useState(""); // For search query
	const [selectedItem, setSelectedItem] = useState(null); // To store selected object

	// Event handler for input change
	const handleInputChange = (e) => {
		const searchQuery = e.target.value.toLowerCase();
		setQuery(searchQuery); // Update the search query in state
	};

	// Effect to fetch data or filter only when input is written
	useEffect(() => {
		dispatch(fetchUsers());
		// Simulate data fetch or filter if there's something in the input field
		const fetchData = () => {
			// Simulate a delay for data fetching
			setTimeout(() => {
				// Only filter if getUsers exists and is an array
				if (getUsers && Array.isArray(getUsers)) {
					// Filter data based on the query input, excluding the current user
					const filtered = getUsers.filter((item) => item.id !== user.id);
					setDataList(filtered); // Set filtered data
				} else {
					// Clear the input and dataList if no results are found or getUsers is undefined
					setQuery("");
					setDataList([]);
				}
			}, 1000); // Simulate network latency
		};

		fetchData();
	}, [dispatch, getUsers, user.id]); // Trigger useEffect only when dependencies change

	// Event handler for item selection
	const handleItemClick = (item) => {
		if (item !== 0) {
			setQuery(item.fullName); // Set selected item name in the input field
			setSelectedItem(item); // Save the selected object
			onSelectItem(item);
			setDataList([]); // Hide dropdown
		} else {
			setQuery("");
			onSelectItem(0);
			setSelectedItem(null);
			setDataList([]);
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
					<a href="#" className="dropdown-item" onClick={() => handleItemClick(0)}>
						- Fara utilizator -
					</a>
				</li>
				{dataList.length > 0 ? (
					dataList.map((item) => (
						<li key={item.id}>
							<a href="#" className="dropdown-item" onClick={() => handleItemClick(item)}>
								{item.fullName}
							</a>
						</li>
					))
				) : (
					<li className="dropdown-item text-muted">No results found</li>
				)}
			</ul>
		</div>
	);
};

export default Datalist;
