const sequelize = require("./config/db"); // Import your Sequelize instance

const User = require("./models/user");
const Ticket = require("./models/ticket");

// print process.argv
let force = "";

if (process.argv[2] == "force") {
	console.log("Force Syncing Database");
	force = { force: true };
}

const syncDatabase = async () => {
	try {
		// await sequelize.sync(force); // Use { force: true } only in development
		await sequelize.sync({ alter: true }); // Use { force: true } only in development
		console.log("Database & tables created!");
	} catch (error) {
		console.error("Error syncing database:", error);
	} finally {
		await sequelize.close();
	}
};

syncDatabase();
