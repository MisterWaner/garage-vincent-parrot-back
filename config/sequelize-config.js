// Import modules
import { config } from "dotenv";
import { Sequelize } from "sequelize";

//Start config of sequelize
config();

//Import models
import Day from "../models/Day.js";
import Car from "../models/Car.js";
import Image from "../models/Image.js";
import Review from "../models/Review.js";
import Service from "../models/Service.js";
import Slot from "../models/Slot.js";
import User from "../models/User.js";
import Mail from "../models/Mail.js";

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

db.User = User(sequelize);
db.Day = Day(sequelize);
db.Car = Car(sequelize);
db.Image = Image(sequelize);
db.Review = Review(sequelize);
db.Service = Service(sequelize);
db.Slot = Slot(sequelize);
db.Mail = Mail(sequelize);

//Relation

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


db.sequelize.sync({});

export default db;
