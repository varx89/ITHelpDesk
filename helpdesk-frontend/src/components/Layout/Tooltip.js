import React, { useEffect } from "react";

const Tooltip = (props) => {
	useEffect(() => {
		// Initialize tooltips
		const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
		const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl));

		// Cleanup function to destroy tooltips on unmount
		return () => {
			tooltipList.forEach((tooltip) => tooltip.dispose());
		};
	}, []); // Empty dependency array means this runs once on mount

	return (
		<div
			data-bs-toggle="tooltip"
			data-bs-placement="top"
			data-bs-custom-class="custom-tooltip"
			data-bs-title={props.data}
			className="col-6 text-truncate text-warning2"
		>
			{props.data}
		</div>
	);
};

export default Tooltip;
