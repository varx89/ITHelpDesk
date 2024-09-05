// tooltip
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

// graphic charts
// JavaScript code to render the chart
const ctx = document.getElementById("myChart");

new Chart(ctx, {
	type: "line",
	data: {
		labels: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
		datasets: [
			{
				label: "# nr de tichete totale",
				data: [55, 19, 3, 5, 2, 55, 12, 19, 91, 5, 2, 3],
				borderWidth: 1,
			},
			{
				label: "# nr meu de tichete",
				data: [51, 24, 31, 51, 22, 4, 33, 22, 11, 58, 6, 11],
				borderWidth: 1,
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
