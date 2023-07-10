// Import modules
import { config } from "dotenv";
import { Sequelize } from "sequelize";

//Start config of sequelize
config()

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

const db = {}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.sync({});

export default db;