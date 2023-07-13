//Import modules
import { DataTypes, Model } from "sequelize";
import Employee from "./Employee.js";
import Review from "./Review.js";

export default (sequelize) => {
    class Employee_Review extends Model {}

    Employee_Review.init(
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
            reviewId: {
                type: DataTypes.INTEGER,
                references: {
                    model: Review,
                    key: "id",
                },
            },
        },
        {
            modelName: "employee_review",
            tableName: "employees_reviews",
            timestamps: false,
            sequelize,
        }
    );

    return Employee_Review;
};
