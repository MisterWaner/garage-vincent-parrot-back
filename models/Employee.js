//Import modules
import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
    class Employee extends Model {}

    Employee.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
        },
        {
            modelName: "employee",
            tableName: "employees",
            timestamps: false,
            sequelize,
        }
    );

    return Employee;
};
