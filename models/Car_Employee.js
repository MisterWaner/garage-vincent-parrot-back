//Import modules
import { DataTypes, Model } from "sequelize";
import Employee from "./Employee.js";
import Car from "./Car.js";

export default (sequelize) => {
    class Car_Employee extends Model {}

    Car_Employee.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            employeeId: {
                type: DataTypes.INTEGER,
                references: {
                    model: Employee,
                    key: "id",
                },
            },
            carImmat: {
                type: DataTypes.STRING,
                references: {
                    model: Car,
                    key: "immat",
                },
            },
        },
        {
            modelName: "car_employee",
            tableName: "cars_employees",
            timestamps: false,
            sequelize,
        }
    );

    return Car_Employee;
};
