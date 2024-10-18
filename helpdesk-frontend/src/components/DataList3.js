import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../features/user/fetchUsersSlice";

const Datalist = () => {
	const { user } = useSelector((state) => state.user);
	const { getUsers } = useSelector((state) => state.getUsers);
	const dispatch = useDispatch();

	const [dataList, setDataList] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedItem, setSelectedItem] = useState(null);

	// Effect to fetch data or filter only when input is written
	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	// Handle item click
	const handleItemClick = (item) => {
		setSelectedItem(item.fullName);
		console.log("moloz", selectedItem);
	};

	return (
		<div className="dropdown">
			<button
				className="btn btn-secondary dropdown-toggle text-secondary-emphasis border border-info bg-body w-100"
				type="button"
				id="dropdownMenuButton"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				{selectedItem || "Select an option"}
			</button>
			<ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
				<input className="form-control" type="text" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} />
				{/*   */}
				{getUsers?.map((item) => (
					<li key={item.id}>
						<a href="#" className="dropdown-item" onClick={() => handleItemClick(item)}>
							{item.fullName}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Datalist;
