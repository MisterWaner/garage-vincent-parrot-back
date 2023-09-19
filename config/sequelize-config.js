// Import modules
import { config } from "dotenv";
import { Sequelize } from "sequelize";

//Start config of sequelize
config();

//Import models

import Car from "../models/Car.js";
import Review from "../models/Review.js";
import Service from "../models/Service.js";
import Planning from "../models/Planning.js";   
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
db.Car = Car(sequelize);
db.Review = Review(sequelize);
db.Service = Service(sequelize);
db.Planning = Planning(sequelize);
db.Mail = Mail(sequelize);

db.sequelize.sync({});

export default db;
