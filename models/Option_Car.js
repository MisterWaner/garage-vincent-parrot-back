//Import modules
import { DataTypes, Model } from "sequelize";
import Option from "./Option.js";
import Car from "./Car.js";

export default (sequelize) => {
    class Option_Car extends Model {}

    Option_Car.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            optionId: {
                type: DataTypes.INTEGER,
                references: {
                    model: Option,
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
            modelName: "option_car",
            tableName: "options_cars",
            timestamps: false,
            sequelize,
        }
    );

    return Option_Car;
};
