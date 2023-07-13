//Import modules
import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
    class Image extends Model {}

    Image.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            modelName: "image",
            tableName: "images",
            timestamps: false,
            sequelize,
        }
    );

    return Image;
};
