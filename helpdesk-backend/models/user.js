// models/User.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Adjust the path as necessary

class User extends Model {}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		fullName: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.ENUM("normal", "admin"),
			defaultValue: "normal",
		},
	},
	{
		sequelize,
		modelName: "User",
		tableName: "users",
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

module.exports = User;
