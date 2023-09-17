//import modules
import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
    class Mail extends Model {}

    Mail.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            firstname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true, //data validation
                },
            },
            phone: {
                type: DataTypes.STRING(10),
                allowNull: false,
                validate: {
                    isNumeric: true,
                    len: [0, 10],
                },
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            subject: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            message: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            isRead: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            }
        },
        {
            modelName: "mail",
            tableName: "mails",
            timestamps: false,
            sequelize,
        }
    );

    return Mail;
};
