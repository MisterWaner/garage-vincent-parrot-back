//Import modules
import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
    class Service extends Model {}

    Service.init(
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
                type: DataTypes.TEXT("medium"),
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true, //data validation
                },
                allowNull: false,
            },
        },
        {
            modelName: "service",
            tableName: "services",
            timestamps: false,
            sequelize,
        }
    );

    return Service;
};
