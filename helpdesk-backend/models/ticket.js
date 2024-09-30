// // backend/models/ticket.js
// module.exports = (sequelize, DataTypes) => {
// 	const Ticket = sequelize.define("Ticket", {
// 		name: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		username: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		department: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		description: {
// 			type: DataTypes.TEXT,
// 			allowNull: false,
// 		},
// 		status: {
// 			type: DataTypes.ENUM("new", "in_progress", "closed"),
// 			defaultValue: "new",
// 		},
// 		solvingRemark: {
// 			type: DataTypes.TEXT,
// 		},
// 		closedAt: {
// 			type: DataTypes.DATE,
// 		},
// 		admin: {
// 			type: DataTypes.STRING, // Admin handling the ticket
// 		},
// 	});

// 	return Ticket;
// };

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Adjust the path as necessary

class Ticket extends Model {}

Ticket.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		department: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM("new", "in_progress", "closed"),
			defaultValue: "new",
		},
		solvingRemark: {
			type: DataTypes.TEXT,
		},
		closedAt: {
			type: DataTypes.DATE,
		},
		admin: {
			type: DataTypes.STRING, // Admin handling the ticket
		},
	},
	{
		sequelize,
		modelName: "Ticket",
		tableName: "tickets",
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

module.exports = Ticket;
