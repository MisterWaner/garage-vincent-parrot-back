/********************** Import modules *********************/
import express from "express";
import { config } from "dotenv";
import db from "./config/sequelize-config.js";

config();
const app = express();

/************************* Routes ************************/
app.get("/api", (req, res) => {
    res.send("API en ligne et fonctionnelle");
});

/*************************** Start Server *************************/

db.sequelize
    .authenticate()
    .then(() => console.log("DB is connected"))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Server is running on port ${process.env.SERVER_PORT}`);
        });
    })
    .catch((err) => console.log("error occured :", err));
