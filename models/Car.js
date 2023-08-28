//Import modules
import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
    class Car extends Model {}

    Car.init(
        {
            immat: {
                type: DataTypes.STRING(9),
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            brand: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            model: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            year: {
                type: DataTypes.INTEGER,
                validate: {
                    min: 1960,
                    max: 2022
                },
                allowNull: false,
            },
            color: {
                type: DataTypes.STRING,
                allowNull: false
            },
            kilometers: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            motor: {
                type: DataTypes.STRING,
                allowNull: false
            },
            puissance: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            modelName: "car",
            tableName: "cars",
            timestamps: false,
            sequelize,
        }
    );

    return Car;
};
