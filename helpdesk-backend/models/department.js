// models/User.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Adjust the path as necessary

class Department extends Model {}

Department.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		department: {
			type: DataTypes.INTEGER,
			unique: true,
			allowNull: false,
		},
		departmentFullName: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "Department",
		tableName: "departments",
		timestamps: false,
	}
);

module.exports = Department;
