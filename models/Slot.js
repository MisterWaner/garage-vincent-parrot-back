//Import modules
import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
    class Slot extends Model {}

    Slot.init(
        {
            id: {
                type: DataTypes.SMALLINT,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            openingHour: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            closingHour: {
                type: DataTypes.TIME,
                allowNull: false,
            },
        },
        {
            modelName: "slot",
            tableName: "slots",
            timestamps: false,
            sequelize,
        }
    );

    return Slot;
};
