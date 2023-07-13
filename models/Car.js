//Import modules
import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
    class Car extends Model {}

    Car.init({
        immat: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        mark: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        kilometers: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        modelName: "car",
        tableName: "cars",
        timestamps: false,
        sequelize,
    });

    return Car;
};
