//Import modules
import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
    class Option extends Model {}

    Option.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            modelName: "option",
            tableName: "options",
            timestamps: false,
            sequelize,
        }
    );

    return Option;
};
