//Import modules
import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
    class Day extends Model {}

    Day.init(
        {
            id: {
                type: DataTypes.SMALLINT,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isOpen: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            
        },
        {
            modelName: "day",
            tableName: "days",
            timestamps: false,
            sequelize,
        }
    );

    return Day;
};
