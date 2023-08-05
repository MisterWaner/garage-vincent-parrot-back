//Import modules
import { DataTypes, Model } from "sequelize";
import { config } from "dotenv";
config();

export default (sequelize) => {
    class Admin extends Model {}

    Admin.init(
        {
            id: {
                type: DataTypes.SMALLINT,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
        },
        {
            modelName: "admin",
            tableName: "admins",
            timestamps: false,
            sequelize,
        },
    );

    return Admin;
};
