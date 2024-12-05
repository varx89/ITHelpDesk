// import React, { useEffect } from "react";

// const Tooltip = (props) => {
// 	let infoPropsData = props.data ?? " ";
// 	let tooltip = "";
// 	useEffect(() => {
// 		// Initialize tooltips
// 		const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
// 		const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl));

// 		// Cleanup function to destroy tooltips on unmount
// 		return () => {
// 			tooltipList.forEach((tooltip) => tooltip.dispose());
// 		};
// 	}, []); // Empty dependency array means this runs once on mount

// 	if (props.type === "dashboard") {
// 		tooltip = "col-7 text-truncate text-warning2";
// 	} else if (props.type === "admin") {
// 		tooltip = "col-4 text-truncate text-warning2";
// 	}

// 	return (
// 		<div
// 			data-bs-toggle="tooltip"
// 			data-bs-placement="top"
// 			data-bs-custom-class="custom-tooltip"
// 			data-bs-content=" "
// 			data-bs-title={infoPropsData}
// 			className={tooltip}
// 		>
// 			{infoPropsData}
// 		</div>
// 	);
// };

// export default Tooltip;

import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Tooltip = (props) => {
	// Ensure data is always a string or a meaningful fallback
	const infoPropsData = props.data ? String(props.data) : "No data available";

	let tooltip = "";
	useEffect(() => {
		// Initialize tooltips
		const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
		const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl));

		// Cleanup function to destroy tooltips on unmount
		return () => {
			tooltipList.forEach((tooltip) => tooltip.dispose());
		};
	}, []); // Empty dependency array means this runs once on mount

	// Determine the tooltip class based on the type prop
	if (props.type === "dashboard") {
		tooltip = "col-7 text-truncate text-warning2";
	} else if (props.type === "admin") {
		tooltip = "col-4 text-truncate text-warning2";
	}

	return (
		<div
			data-bs-toggle="tooltip"
			data-bs-placement="top"
			data-bs-custom-class="custom-tooltip"
			data-bs-title={infoPropsData} // Always a string
			className={tooltip}
		>
			{infoPropsData}
		</div>
	);
};

// Prop type validation to catch issues early
Tooltip.propTypes = {
	data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Accept string or number
	type: PropTypes.string, // Type should be a string
};

export default Tooltip;
