import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../features/user/fetchUsersSlice";

const Datalist = () => {
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
		if (query) {
			dispatch(fetchUsers());
			// Simulate data fetch or filter if there's something in the input field
			const fetchData = async () => {
				const data = getUsers;

				// Simulate a delay for data fetching
				setTimeout(() => {
					// Filter data based on the query input
					const filtered = data?.filter((item) => item.id !== user.id && item.fullName.toLowerCase().includes(query));
					setDataList(filtered); // Set filtered data
				}, 1000); // Simulate network latency
			};

			fetchData();
		} else {
			// Clear the list if the input is cleared
			setDataList([]);
		}
	}, [query]); // Trigger useEffect only when query changes and is not empty

	// Event handler for item selection
	const handleItemClick = (item) => {
		setQuery(item.name); // Set selected item name in the input field
		setSelectedItem(item); // Save the selected object
		setDataList([]); // Hide dropdown
	};

	// Hide dropdown when clicked outside (optional)
	const handleClickOutside = (e) => {
		if (!e.target.closest(".form-group")) {
			setDataList([]); // Hide dropdown when clicking outside
		}
	};

	// Add a global click listener to close the dropdown when clicking outside
	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	return (
		<>
			<div className="form-group position-relative">
				<input
					type="text"
					className="form-control"
					id="searchInput"
					value={selectedItem ? selectedItem.fullName : query}
					onChange={handleInputChange}
					placeholder="Creare ticket pt alt utilizator..."
				/>

				{dataList?.length > 0 && (
					<ul className="dropdown-menu w-100" style={{ display: "block", maxHeight: "200px", overflowY: "auto" }}>
						{dataList.map((item) => (
							<li key={item.id}>
								<button type="button" className="dropdown-item" onClick={() => handleItemClick(item)}>
									{item.fullName}
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	);
};

export default Datalist;
