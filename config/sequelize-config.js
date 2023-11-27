// Import modules
import { config } from "dotenv";
import { Sequelize } from "sequelize";

//Start config of sequelize
config();

//Import models

import Car from "../models/Car.js";
import Review from "../models/Review.js";
import Planning from "../models/Planning.js";   
import User from "../models/User.js";
import Mail from "../models/Mail.js";

//Create connexion between DB and sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME, //name of DB
    process.env.DB_USER, //user of DB
    process.env.DB_PASS, //password of DB
    {
        host: process.env.DB_HOST, //host of DB
        port: process.env.DB_PORT, //port of DB
        dialect: "mysql", //type of DB
    }
);

//Relation initialization
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User(sequelize); 
db.Car = Car(sequelize);
db.Review = Review(sequelize);
db.Planning = Planning(sequelize);
db.Mail = Mail(sequelize);

db.sequelize.sync({});

export default db;
