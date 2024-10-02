import React, { useEffect } from "react";
import { Chart, registerables } from "chart.js";

// Register the necessary components of Chart.js
Chart.register(...registerables);

const Charts = () => {
	useEffect(() => {
		const ctx = document.getElementById("myChart").getContext("2d");

		const myChart = new Chart(ctx, {
			type: "line",
			data: {
				labels: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
				datasets: [
					{
						label: "# nr de tichete totale",
						data: [55, 19, 3, 5, 2, 55, 12, 19, 91, 5, 2, 3],
						borderWidth: 1,
						borderColor: "rgba(75, 192, 192, 1)",
						backgroundColor: "rgba(75, 192, 192, 1)",
						fill: false,
					},
					{
						label: "# nr meu de tichete",
						data: [51, 24, 31, 51, 22, 4, 33, 22, 11, 58, 6, 11],
						borderWidth: 1,
						borderColor: "rgba(255, 99, 132, 1)",
						backgroundColor: "rgba(255, 99, 132, 1)",
						fill: false,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		});

		// Cleanup function to destroy the chart when the component unmounts
		return () => {
			myChart.destroy();
		};
	}, []); // Empty dependency array means this runs once on mount

	return (
		<div className="chartWidth">
			<canvas id="myChart"></canvas>
		</div>
	);
};

export default Charts;
