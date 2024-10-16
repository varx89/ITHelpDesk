// backend/server.js
const express = require("express");
const sequelize = require("./config/db"); // Import your Sequelize instance
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const departmentRoutes = require("./routes/departmentRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/departments", departmentRoutes);

// Sync models with the database
// sequelize
// 	.sync({ alter: true }) // 'alter: true' will update the schema without dropping tables
// 	.then(() => {
// 		console.log("Database synchronized successfully.");
// 	})
// 	.catch((err) => {
// 		console.error("Error synchronizing the database:", err);
// 	});

const auth = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

auth();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
