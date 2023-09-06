//Import modules
import { DataTypes, Model } from "sequelize";
import User from "./User.js";
import Review from "./Review.js";

export default (sequelize) => {
    class User_Review extends Model {}

    User_Review.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: User,
                    key: "id",
                },
            },
            reviewId: {
                type: DataTypes.INTEGER,
                references: {
                    model: Review,
                    key: "id",
                },
            },
        },
        {
            modelName: "employee_review",
            tableName: "employees_reviews",
            timestamps: false,
            sequelize,
        }
    );

    return User_Review;
};
