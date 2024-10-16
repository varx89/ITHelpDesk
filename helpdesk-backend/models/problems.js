// models/User.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Adjust the path as necessary

class Problems extends Model {}

Problems.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		problema: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "Problem",
		tableName: "problems",
		timestamps: false,
	}
);

module.exports = Problems;
