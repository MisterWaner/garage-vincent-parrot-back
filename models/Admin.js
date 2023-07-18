//Import modules
import { DataTypes, Model } from "sequelize";
import { config } from "dotenv";
import bcrypt from "bcrypt";
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
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true, //data validation
                },
                allowNull: false,
                unique: true, //unique email
            },
            password: {
                type: DataTypes.STRING(64),
                is: /^[0-9a-z]{64}$/i, //constraint regex
                allowNull: false,
            },
            confirmation: {
                type: DataTypes.STRING(64),
                is: /^[0-9a-z]{64}$/i, //constraint regex
                allowNull: false,
            },
            firstname: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: true,
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
