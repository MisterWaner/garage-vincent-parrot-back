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
            opening_hour: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            closing_hour: {
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
