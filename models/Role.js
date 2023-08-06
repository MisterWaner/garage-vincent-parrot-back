//Import modules
import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
    class Role extends Model {}

    Role.init(
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
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            modelName: "role",
            tableName: "roles",
            timestamps: false,
            sequelize,
        }
    );

    return Role;
};
