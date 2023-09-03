//Import Modules
import { DataTypes, Model } from "sequelize";
import { config } from "dotenv";
config();

export default (sequelize) => {
    class User extends Model {}

    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true, //data validation
                },
                allowNull: true,
                unique: true, //unique email
            },
            password: {
                type: DataTypes.STRING(64),
                is: /^[0-9a-z]{64}$/i, //constraint regex
                allowNull: true,
            },
            firstname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            services: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            modelName: "user",
            tableName: "users",
            timestamps: false,
            sequelize,
        }
    );

    return User;
};
