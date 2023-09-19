//Import modules
import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
    class Planning extends Model { }
    
    Planning.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
            },
            day: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            morningOpeningHour: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            morningClosingHour: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            afternoonOpeningHour: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            afternoonClosingHour: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            modelName: "planning",
            tableName: "plannings",
            timestamps: false,
            sequelize,
        }
    );

    return Planning;
}