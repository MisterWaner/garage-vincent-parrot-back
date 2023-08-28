// Import modules
import { config } from "dotenv";
import { Sequelize } from "sequelize";

//Start config of sequelize
config();

//Import models
import Admin from "../models/Admin.js";
import Employee from "../models/Employee.js";
import Day from "../models/Day.js";
import Car from "../models/Car.js";
import Image from "../models/Image.js";
import Car_Employee from "../models/Car_Employee.js";
import Review from "../models/Review.js";
import Service from "../models/Service.js";
import Slot from "../models/Slot.js";
import Employee_Review from "../models/Employee_Review.js";
import Role from "../models/Role.js";
import User from "../models/User.js";

//Create connexion between DB and sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
    }
);

//Relation initialization
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Role = Role(sequelize);
db.User = User(sequelize);
db.Admin = Admin(sequelize);
db.Employee = Employee(sequelize);
db.Day = Day(sequelize);
db.Car = Car(sequelize);
db.Image = Image(sequelize);
db.Car_Employee = Car_Employee(sequelize);
db.Employee_Review = Employee_Review(sequelize);
db.Review = Review(sequelize);
db.Service = Service(sequelize);
db.Slot = Slot(sequelize);

//Relation

//Role has many users
Role.User = db.Role.hasMany(db.User, {
    as: "users",
    foreignKey: {
        name: "roleId",
        allowNull: false,
        defaultValue: 2,
    },
    sourceKey: "id",
});
//User belongs to one role
User.Role = db.User.belongsTo(db.Role);

//User has many admin
User.Admin = db.User.hasMany(db.Admin, {
    as: "admins",
    foreignKey: {
        name: "userId",
        allowNull: false,
    },
    sourceKey: "id",
});

//Admin belongs to users
Admin.User = db.Admin.belongsTo(db.User);

//User has many employee
User.Employee = db.User.hasMany(db.Employee, {
    as: "employees",
    foreignKey: {
        name: "userId",
        allowNull: false,
    },
    sourceKey: "id",
});
//Employee belongs to users
Employee.User = db.Employee.belongsTo(db.User);

//Car has many images
Car.Image = db.Car.hasMany(db.Image, {
    as: "cars",
    foreignKey: {
        name: "carImmat",
        allowNull: false,
    },
    sourceKey: "immat",
});

//Image belongs to one car
Image.Car = db.Image.belongsTo(db.Car);

//One slot belongs to many day
Slot.Day = db.Slot.hasMany(db.Day, {
    as: "slots",
    foreignKey: {
        name: "slotId",
        allowNull: false,
    },
    sourceKey: "id",
});
//One day has one slot
Day.Slot = db.Day.belongsTo(db.Slot);

Car.Employee = db.Car.belongsToMany(db.Employee, {
    foreignKey: {
        name: "carImmat",
        allowNull: false,
    },
    sourceKey: "immat",
    through: db.Car_Employee,
});
Employee.Car = db.Employee.belongsToMany(db.Car, {
    foreignKey: {
        name: "employeeId",
        allowNull: false,
    },
    sourceKey: "id",
    through: db.Car_Employee,
});

Employee.Review = db.Employee.belongsToMany(db.Review, {
    foreignKey: {
        name: "employeeId",
        allowNull: false,
    },
    sourceKey: "id",
    through: db.Employee_Review,
});
Review.Employee = db.Review.belongsToMany(db.Employee, {
    foreignKey: {
        name: "reviewId",
        allowNull: false,
    },
    sourceKey: "id",
    through: db.Employee_Review,
});

db.sequelize.sync({});

export default db;
