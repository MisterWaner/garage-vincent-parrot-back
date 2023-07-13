//Import modules
import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
    class Review extends Model {}

    Review.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            author: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            text: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
        },
        {
            modelName: "review",
            tableName: "reviews",
            timestamps: false,
            sequelize,
        }
    );

    return Review;
};
